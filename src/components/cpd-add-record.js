import '@brightspace-ui/core/components/inputs/input-text.js';
import './attachments';
import 'd2l-date-picker/d2l-date-picker.js';
import 'd2l-html-editor/d2l-html-editor';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { dateParamString, getHours, getMinutes, getTotalMinutes } from '../helpers/time-helper.js';
import { BaseMixin } from '../mixins/base-mixin.js';
import { CpdServiceFactory } from '../services/cpd-service-factory';
import dayjs from 'dayjs/esm';
import { selectStyles } from '@brightspace-ui/core/components/inputs/input-select-styles.js';

class AddCpdRecord extends BaseMixin(LitElement) {
	static get properties() {
		return {
			attachments: {
				type: Array
			},
			awardRecord: {
				type: Object
			},
			methods: {
				type: Array
			},
			questions: {
				type: Array
			},
			record: {
				type: Object
			},
			recordId: {
				type: Number
			},
			subjects: {
				type: Array
			},
			types: {
				type: Array
			},
			viewUserId: {
				type: Number
			}
		};
	}

	static get styles() {
		return [
			selectStyles,
			css`
		main {
			width: 100%;
		}
		main > ul {
			display: grid;
			grid-template-rows: repeat(4, 1fr);
			grid-auto-rows: auto;
		}
		d2l-date-picker {
			width: 7rem;
		}
		d2l-html-editor {
			border-radius: 0.3rem;
			border-style: solid;
			border-width: 1px;
			border-color: initial;
		}
		ul {
			list-style-type: none;
			padding: 0;
			margin: 0;
		}
		li {
			padding: 8px 0px;
		}
		.numberInput {
			width: 200px;
		};
		ul.innerlist {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
		}
		ul.innerlist > li {
			list-style: none;
			display: inline-block;
			width: calc(100% / 4);
		  }
		.credit-container {
			display: grid;
			grid-template-columns: 1fr 1fr;
			grid-gap: 20px;
		}
		.credit-time-container {
			display: grid;
			grid-template-rows: 1fr;
			grid-template-columns: 1fr 1fr;
		}
		`];
	}

	constructor() {
		super();
		this.cpdService = CpdServiceFactory.getCpdService();
		this.questions =  [];
		this.subjects = [];
		this.methods = [];
		this.types = this.cpdService.getTypes();
		this.attachments = [];
	}

	connectedCallback() {
		super.connectedCallback();

		this.cpdService.getSubjects()
			.then(body => {
				this.subjects = body;
			}),
		this.cpdService.getMethods()
			.then(body => {
				this.methods = body;
			});
		this.cpdService.getQuestions()
			.then(body => {
				this.questions = body;
			});
		if (this.recordId) {
			this.cpdService.getRecord(this.recordId)
				.then(body => {
					if (body.Attachments) {
						this.attachments = body.Attachments.Files;
					}
					this.record = body;
				});
		}

		if (this.awardRecord) {
			this.record = {
				Name: this.awardRecord.Name,
				Subject: {
					Id: this.awardRecord.SubjectId
				},
				IsStructured: 1,
				Method: {
					Id: this.awardRecord.MethodId
				},
				IssuedAwardId: this.awardRecord.IssuedAwardId,
				Grade: this.awardRecord.Grade,
				CreditMinutes: this.awardRecord.CreditMinutes,
				DateCompleted: dateParamString(this.awardRecord.IssuedDate)
			};
		}
	}

	attachmentsUpdated(event) {
		this.attachments = event.detail.attachmentsList;
	}

	cancelForm() {
		this.fireNavigateMyCpdEvent();
	}

	fireNavigateMyCpdEvent() {
		this.fireNavigationEvent({page:'cpd-my-records'});
	}

	getQuestionAnswer(record, questionId) {
		const answer = record && record.Answers && record.Answers.find(a => a.QuestionId === questionId) || {};
		return answer.Text || '';
	}

	getQuestionKey(record, questionId) {
		const answer = record && record.Answers && record.Answers.find(a => a.QuestionId === questionId) || false;
		return answer ? 're-render' : 'render';
	}

	validateForm() {
		let missingField = false;
		const name = this.shadowRoot.querySelector('#recordName');
		const creditHours = this.shadowRoot.querySelector('#creditHours');
		const creditMinutes = this.shadowRoot.querySelector('#creditMinutes');
		const dateCompleted = this.shadowRoot.querySelector('#dateCompletedPicker');

		if (!name.value) {
			name.setAttribute('aria-invalid', true);
			missingField = true;
		}
		else {
			name.value = name.value.trim();
			if (!name.value) {
				name.setAttribute('aria-invalid', true);
				missingField = true;
			}
		}
		if (!creditHours.value && !creditMinutes.value) {
			creditHours.setAttribute('aria-invalid', true);
			creditMinutes.setAttribute('aria-invalid', true);
			missingField = true;
		}
		if (!dateCompleted.value) {
			dateCompleted.shadowRoot.querySelector('.d2l-input').setAttribute('aria-invalid', true);
			missingField = true;
		}
		return missingField;
	}

	saveForm() {
		if (this.validateForm()) {
			return;
		}

		const record = {
			Name: this.shadowRoot.querySelector('#recordName').value,
			SubjectId: this.shadowRoot.querySelector('#subjectSelect').value,
			IsStructured: !!+this.shadowRoot.querySelector('#typeSelect').value,
			MethodId: this.shadowRoot.querySelector('#methodSelect').value,
			IssuedAwardId: this.awardRecord && this.awardRecord.IssuedAwardId,
			Grade: this.awardRecord && this.awardRecord.Grade,
			CreditMinutes: getTotalMinutes(this.shadowRoot.querySelector('#creditHours').value, this.shadowRoot.querySelector('#creditMinutes').value),
			DateCompleted: dateParamString(this.shadowRoot.querySelector('#dateCompletedPicker').value),
			Answers: this.questions.map(question => {
				return {
					QuestionId: question.Id,
					AnswerText: this.shadowRoot.querySelector(`#answerText_${question.Id}`).getContent()
				};
			})
		};
		if (this.recordId) {
			return this.saveUpdatedRecord(record);
		}
		this.cpdService.createRecord(record, this.attachments)
			.then(() => this.fireNavigateMyCpdEvent());
	}

	saveUpdatedRecord(record) {
		const newAttachments = this.attachments.filter(f => f instanceof File);
		let removedAttachments = [];
		if (this.record.Attachments) {
			removedAttachments = this.record.Attachments.Files
				.filter(oldFile => !this.attachments.includes(oldFile))
				.map(f => f.id);
		}
		this.cpdService.updateRecord(this.recordId, record, newAttachments, removedAttachments)
			.then(() => this.fireNavigateMyCpdEvent());
	}

	render() {
		return html`
			<main>
				<h2>${this.record ? this.localize('editCPD') : this.localize('addNewCPD')}</h2>
				<ul>
					<li>
						<label for="recordName" class="d2l-label-text">${this.localize('name')}</label>
						<d2l-input-text autocomplete="off" id="recordName" required value="${this.record && this.record.Name || ''}"></d2l-input-text>
					</li>
					<li>
						<ul class="innerlist">
							<li>
								<div>
									<label for="typeSelect">${this.localize('type')}</label>
								</div>
								<select
									aria-label="${this.localize('chooseChoice', {choice: this.localize('type')})}"
									class="d2l-input-select select_filter"
									id="typeSelect"
									>
									${this.types.map((option) => this.renderSelect(option, this.record && +this.record.IsStructured))}
								</select>
							</li>
							<li>
								<div>
									<label for="subjectSelect">${this.localize('subject')}</label>
								</div>
								<select
									aria-label="${this.localize('chooseChoice', {choice: this.localize('subject')})}"
									class="d2l-input-select select_filter"
									id="subjectSelect"
									>
									${this.subjects.map((option) => this.renderSelect(option, this.record && this.record.Subject && this.record.Subject.Id || 0))}
								</select>
							</li>
							<li>
								<div>
									<label for="methodSelect">${this.localize('method')}</label>
								</div>
								<select
									aria-label="${this.localize('chooseChoice', {choice: this.localize('method')})}"
									class="d2l-input-select select_filter"
									id="methodSelect"
									>
									${this.methods.map((option) => this.renderSelect(option, this.record && this.record.Method && this.record.Method.Id || 0))}
								</select>
							</li>
						</ul>
					</li>
					<li>
						<div class="credit-container">
							<div class="credit-time-container">
								<div>
									<label for="creditHours" class="d2l-label-text">${this.localize('creditHours')}</label>
									<d2l-input-text class="numberInput" id="creditHours" required placeholder=${this.localize('enterCreditHours')} type="number" min="0" value="${this.record && getHours(this.record.CreditMinutes) || ''}"></d2l-input-text>
								</div>
								<div>
									<label for="creditMinutes" class="d2l-label-text">${this.localize('creditMinutes')}</label>
									<d2l-input-text class="numberInput" id="creditMinutes" required placeholder=${this.localize('enterCreditMinutes')} type="number" min="0" max="59"  value="${this.record && getMinutes(this.record.CreditMinutes) || ''}"></d2l-input-text>
								</div>
							</div>
							${this.record && this.record.Grade ? html`
								<div class="grade-container">
									<label for="gradeValue" class="d2l-label-text">${this.localize('grade')}</label>
									<div id="gradeValue">${this.record.Grade}</div>
								</div>
							` : html``}
						</div>
					</li>
					<li>
						<label for="dateCompletedPicker" class=d2l-label-text>${this.localize('dateCompleted')}</label>
						<d2l-date-picker
							id="dateCompletedPicker"
							required
							value="${this.record && this.record.DateCompleted && dayjs(this.record.DateCompleted).format('YYYY-MM-DD') || dayjs(new Date()).format('YYYY-MM-DD')}"
							@d2l-date-picker-value-changed="${this.updateFilter}"
						></d2l-date-picker>
					</li>
					<li>
						<label>${this.localize('addEvidence')}</label>
						<d2l-attachments .attachmentsList="${this.attachments}" @d2l-attachments-list-updated="${this.attachmentsUpdated}"></d2l-attachments>

					</li>
					${this.questions.map((q) => this.renderQuestion(q))}
				</ul>
				<div>
					<d2l-button @click="${this.saveForm}">${this.localize('save')}</d2l-button>
					<d2l-button @click="${this.cancelForm}">${this.localize('cancel')}</d2l-button>
				</div>

			</main>
		`;
	}

	renderQuestion(question) {
		return html`
			<li>
				<label for=${`answerText_${question.Id}`}>${question.QuestionText}</label>
				<d2l-html-editor
					id=${`answerText_${question.Id}`}
					key="${ this.getQuestionKey(this.record, question.Id)}"
					editor-id=${`answerText_${question.Id}_editor`}
					toolbar="bold italic underline | bullist d2l_formatrollup | undo redo"
					app-root=${`${window.location.href.replace(/[^/]*$/, '')}node_modules/d2l-html-editor/`}
					content="${ encodeURIComponent(this.getQuestionAnswer(this.record, question.Id))}">
						<div id=${`answerText_${question.Id}_editor`} role="textbox" class="d2l-richtext-editor-container"></div>
				</d2l-html-editor>
			</li>
		`;
	}
	renderSelect(option, selectedOption) {
		return html`
		<option
			value="${option.Id}"
			?selected=${selectedOption === option.Id}
			>
			${option.Name}
		</option>
		`;
	}

}

customElements.define('d2l-cpd-add-record', AddCpdRecord);
