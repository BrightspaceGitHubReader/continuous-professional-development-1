import '@brightspace-ui/core/components/inputs/input-text.js';
import './attachments';
import 'd2l-html-editor/d2l-html-editor';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { BaseMixin } from '../mixins/base-mixin.js';
import { CpdRecordsServiceFactory } from '../services/cpd-records-service-factory';
import { selectStyles } from '@brightspace-ui/core/components/inputs/input-select-styles.js';

class AddCpdRecord extends BaseMixin(LitElement) {
	static get properties() {
		return {
			attachments: {
				type: Array
			},
			methods: {
				type: Array
			},
			questions: {
				type: Array
			},
			subjects: {
				type: Array
			},
			types: {
				type: Array
			}
		};
	}

	static get styles() {
		return [
			selectStyles,
			css`
		main {
			width: 100%
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
			padding: 10px;
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
		`];
	}

	constructor() {
		super();
		this.cpdRecordService = CpdRecordsServiceFactory.getRecordsService();
		this.questions =  [];
		this.subjects = [];
		this.methods = [];
		this.types = this.cpdRecordService.getTypes();
		this.attachments = [];
	}

	connectedCallback() {
		super.connectedCallback();

		this.cpdRecordService.getSubjects()
			.then(body => {
				this.subjects = body;
			}),
		this.cpdRecordService.getMethods()
			.then(body => {
				this.methods = body;
			});
		this.cpdRecordService.getQuestions()
			.then(body => {
				this.questions = body;
			});
	}

	attachmentsUpdated(event) {
		this.attachments = event.detail.attachmentsList;
	}

	cancelForm() {
		this.fireNavigateMyCpdEvent();
	}

	fireNavigateMyCpdEvent() {
		const event = new CustomEvent('d2l-navigate-my-cpd');
		this.dispatchEvent(event);
	}

	saveForm() {
		const record = {
			Name: this.shadowRoot.querySelector('#recordName').value,
			SubjectId: this.shadowRoot.querySelector('#subjectSelect').value,
			IsStructured: !!+this.shadowRoot.querySelector('#typeSelect').value,
			MethodId: this.shadowRoot.querySelector('#methodSelect').value,
			CreditMinutes: this.shadowRoot.querySelector('#creditHours').value * 60 + this.shadowRoot.querySelector('#creditMinutes').value,
			Answers: this.questions.map(question => {
				return {
					QuestionId: question.Id,
					AnswerText: this.shadowRoot.querySelector(`#answerText_${question.Id}`).getContent()
				};
			})
		};
		this.cpdRecordService.createRecord(record, this.attachments);
		this.fireNavigateMyCpdEvent();
	}

	render() {
		return html`
			<main>
				<ul>
					<li>
						<label for="recordName" class=d2l-label-text>${this.localize('name')}</label>
						<d2l-input-text id="recordName"></d2l-input-text>
					</li>
					<li>
						<ul class="innerlist">
							<li>
								<div>
									<label for="typeSelect">${this.localize('type')}</label>
								</div>
								<select
									class="d2l-input-select select_filter"
									id="typeSelect"
									>
									${this.types.map((option, index) => this.renderSelect(option, index))}
								</select>
							</li>
							<li>
								<div>
									<label for="subjectSelect">${this.localize('subject')}</label>
								</div>
								<select
									class="d2l-input-select select_filter"
									id="subjectSelect"
									>
									${this.subjects.map((option, index) => this.renderSelect(option, index))}
								</select>
							</li>
							<li>
								<div>
									<label for="methodSelect">${this.localize('method')}</label>
								</div>
								<select
									class="d2l-input-select select_filter"
									id="methodSelect"
									>
									${this.methods.map((option, index) => this.renderSelect(option, index))}
								</select>
							</li>
						</ul>
					</li>
					<li>
						<div>
							<div>
								<label for="creditHours" class=d2l-label-text>${this.localize('credits')}</label>
								<d2l-input-text id="creditHours" placeholder=${this.localize('enterCreditHours')} type="number"></d2l-input-text>
								<d2l-input-text class="numberInput" id="creditMinutes" placeholder=${this.localize('enterCreditMinutes')} type="number"></d2l-input-text>
							</div>
							<div>
								<label for="gradeValue" class=d2l-label-text>${this.localize('grade')}</label>
								<div id="gradeValue">94.0</div>
							</div>
						</div>
					</li>
					<li>
						<label>${this.localize('addEvidence')}</label>
						<d2l-attachments @d2l-attachments-list-updated="${this.attachmentsUpdated}"></d2l-attachments>
					<li>
					${this.questions.map((q) => this.renderQuestion(q))}
				</ul>
				<div>
					<d2l-button @click="${this.saveForm}">${this.localize('save')}</d2l-button>
					<d2l-button @click="${this.cancelForm}">${this.localize('btnCancel')}</d2l-button>
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
					editor-id=${`answerText_${question.Id}_editor`}
					toolbar="bold italic underline | bullist d2l_formatrollup | undo redo "
					plugins="lists d2l_formatrollup"
					app-root=${`${window.location.origin}/app/node_modules/d2l-html-editor/`}>
						<div id=${`answerText_${question.Id}_editor`} ></div>
				</d2l-html-editor>
			</li>
		`;
	}
	renderSelect(option) {
		return html`
		<option 
			value="${option.Id}"
			?selected=${this.selected === option.Id}
			>
			${option.Name}
		</option>
		`;
	}

}

customElements.define('d2l-add-cpd-record', AddCpdRecord);
