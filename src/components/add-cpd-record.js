import '@brightspace-ui/core/components/inputs/input-text.js';
import './attachments';
//import 'd2l-html-editor/d2l-html-editor';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { BaseMixin } from '../mixins/base-mixin.js';
import { CpdRecordsServiceFactory } from '../services/cpd-records-service-factory';
import { selectStyles } from '@brightspace-ui/core/components/inputs/input-select-styles.js';

class AddCpdRecord extends BaseMixin(LitElement) {
	static get properties() {
		return {
			questions: {
				type: Array
			},
			attachments: {
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
		this.questions =  this.cpdRecordService.getQuestions();
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
	}

	attachmentsUpdated(event) {
		this.attachments = event.detail.attachmentsList;
		console.log(`attachments Changed: ${this.attachments.length}`);
	}

	saveForm() {
		const record = {
			Name: 'record Name',
			SubjectId: 1,
			IsStructured: false,
			MethodId: 1,
			creditMinutes: 12,
			Answers: [
				{
					AnswerText: 'No answer',
					QuestionId: 1
				}
			]
		};
		this.cpdRecordService.createRecord(record, this.attachments);
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
									<label for="typeSelect">${this.localize('lblType')}</label>
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
									<label for="subjectSelect">${this.localize('lblSubject')}</label>
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
									<label for="methodSelect">${this.localize('lblMethod')}</label>
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
								<d2l-input-text id="creditHours" placeholder=${this.localize('enterCreditHours')}></d2l-input-text>
								<d2l-input-text class="numberInput" id="creditMinutes" placeholder=${this.localize('enterCreditMinutes')}></d2l-input-text>
							</div>
							<div>
								<label for="gradeValue" class=d2l-label-text>${this.localize('grade')}</label>
								<div id="gradeValue">94.0</div>
							</div>
						</div>
					</li>
					<li>
						<label>${this.localize('addEvidence')}</label>
						<d2l-attachments @d2l-attachments-list-updated=${this.attachmentsUpdated}></d2l-attachments>
					<li>
					${this.questions.map((q, index) => this.renderQuestion(q, index))}
				</ul>
				<div>
					<d2l-button @click="${this.saveForm}">${this.localize('save')}</d2l-button>
					<d2l-button>${this.localize('btnCancel')}</d2l-button>
				</div>
			</main>
		`;
	}

	renderQuestion(question, index) {
		return html`
			<li>
				<label for=${`$answerText_${index}`}>${question}</label>
				<d2l-input-text id=${`$answerText_${index}`}>
			</li>
		`;
	}
	renderSelect(option) {
		return html`
			<option value="${option}">${option}</option>
		`;
	}

}

customElements.define('d2l-add-cpd-record', AddCpdRecord);
