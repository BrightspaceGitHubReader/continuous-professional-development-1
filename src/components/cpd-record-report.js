import './progress-overall';
import './progress-subject';
import 'd2l-html-editor/d2l-html-editor';
import '@brightspace-ui/core/components/colors/colors';
import { css, html, LitElement } from 'lit-element/lit-element';
import { getHoursAndMinutes, toLocalDate } from '../helpers/time-helper';
import { heading1Styles, heading2Styles, heading3Styles } from '@brightspace-ui/core/components/typography/styles';
import { BaseMixin } from '../mixins/base-mixin';
import { CpdServiceFactory } from '../services/cpd-service-factory';
import { cpdSharedStyles } from '../styles/cpd-shared-styles';
import { cpdTableStyles } from '../styles/cpd-table-styles';
import { formatDate } from '@brightspace-ui/intl/lib/dateTime';

class CpdRecordReport extends BaseMixin(LitElement) {

	static get properties() {
		return {
			cpdService: {
				type: Object
			},
			userInfo: {
				type: Object
			},
			target: {
				type: Object
			},
			questions: {
				type: Object
			},
			records: {
				type: Array
			},
			progress: {
				type: Object
			},
			userId: {
				type: Number
			}
		};
	}

	static get styles() {
		return [
			cpdTableStyles,
			cpdSharedStyles,
			heading1Styles,
			heading2Styles,
			heading3Styles,
			css`
			.report-header {
				display: grid;
				grid-template-columns: 1fr 1fr;
			}
			.bold {
				font-weight: bold;
			}
			.record-grid {
				display: grid;
				grid-template-columns: 1fr 3fr;
				border: 1px black solid;
				page-break-before: always;
				margin-top: 20px;
			}
			.container {
				padding-left: 75px;
				padding-right: 75px;
			}
			.qa-text {
				grid-column: span 2;
				margin: 20px;
			}
			.qa-text > * {
				margin-top: 0px;
				margin-bottom: 0px;
			}
			d2l-html-editor {
				border: none;
				margin: 10px;
			}
			.record-grid > .d2l-heading-3 {
				justify-self: end;
				align-self: start;
			}
			.record-grid > .record-data {
				align-self: center;
				margin-left: 10px;
			}
			.record-grid > * {
				margin-top: 0.2rem;
				margin-bottom: 0.2rem;
			}
			.progress-header {
				margin-top: 60px;
				margin-bottom: 20px;
			}
			p.attachment {
				margin-top: 0.2rem;
			}
			@media print {
				.container {
					padding: 0px;
					width: 7.5in;
				}
			}
			`
		];
	}

	constructor() {
		super();

		this.cpdService = CpdServiceFactory.getCpdService();

		this.userInfo = {};
		this.records = [];
		this.questions = [];
		this.progress = {};
		this.types = this.cpdService.getTypes();
	}

	connectedCallback() {
		super.connectedCallback();

		this.cpdService.getUserInfo(this.userId)
			.then(body => {
				this.userInfo.DisplayName = body;
			});
		this.cpdService.getTargetRecords(this.userId)
			.then(body => {
				this.records = body;
			});
		this.cpdService.getProgress()
			.then(body => {
				this.progress = this.lowercasePropertyNames(body);
				this.target = {
					rangeStart: this.formatDateString(toLocalDate(this.progress.startdate)),
					rangeEnd: this.formatDateString(toLocalDate(this.progress.enddate))
				};
			});
		this.cpdService.getQuestions()
			.then(body => {
				const reducer = (accumulator, currentValue) => {
					accumulator[currentValue.Id] = currentValue.QuestionText;
					return accumulator;
				};
				this.questions = body.reduce(reducer, {});
			});
	}

	getQuestionKey(record, questionId) {
		const answer = record && record.Answers && record.Answers.find(a => a.QuestionId === questionId) || false;
		return answer ? 're-render' : 'render';
	}

	formatDateString(inputDate) {
		return `${formatDate(inputDate, {format: 'medium'})}`;
	}

	renderRecord(record) {
		return html`
			<div class="record-grid">
				<div class="d2l-heading-3">${this.localize('headingRecordName')}</div>
				<div class="record-data">${record.Name}</div>
				<div class="d2l-heading-3">${this.localize('headingCreditHours')}</div>
				<div class="record-data">${this.localize('shortTimeDuration', getHoursAndMinutes(record.CreditMinutes))}</div>
				<div class="d2l-heading-3">${this.localize('headingDateCompleted')}</div>
				<div class="record-data">${formatDate(new Date(record.DateCompleted))}</div>
				<div class="d2l-heading-3">${this.localize('headingSubject')}</div>
				<div class="record-data">${record.Subject.Name}</div>
				<div class="d2l-heading-3">${this.localize('headingRecordType')}</div>
				<div class="record-data">${this.types.find(type => !!type.Id === record.IsStructured).Name}</div>
				<div class="d2l-heading-3">${this.localize('headingMethod')}</div>
				<div class="record-data">${record.Method.Name}</div>
				<div class="d2l-heading-3">${this.localize('headingGrade')}</div>
				<div class="record-data">${ record.Grade ? record.Grade : this.localize('na') }</div>
				<div class="d2l-heading-3">${this.localize('headingEvidence')}</div>
				${this.renderAttachments(record.Attachments)}
				${record.Answers.map(answer => this.renderAnswer(record.Id, answer))}
			</div>
		`;
	}

	renderAttachments(attachments) {
		if (attachments && attachments.Files) {
			return html`
			<div class="record-data">
				${attachments.Files.map(file => html`<p class="attachment">${file.Name}</p>`)}
			</div>
			`;
		}
		return html`<div class="record-data">${this.localize('na')}</div>`;
	}

	renderAnswer(recordId, answer) {
		const question = this.questions[answer.QuestionId];
		return html`
			<div class="qa-text">
				<div class="d2l-heading-3">
					${question}
				</div>
				<d2l-html-editor
					key="${this.getQuestionKey(this.records, question.Id)}"
					editor-id="answertext-${recordId}-${answer.QuestionId}-editor"
					disabled
					app-root=${`${window.location.href.replace(/[^/]*$/, '')}node_modules/d2l-html-editor/`}
					content="${answer.Text}">
						<div id="answertext-${recordId}-${answer.QuestionId}-editor" role="textbox" class="d2l-richtext-editor-container"></div>
				</d2l-html-editor>
			<div>
		`;
	}

	render() {
		return html`
			<div class="container d2l-typography">
				<div class="report-header">
					<div>
						<div class="d2l-heading-1">${this.localize('cpdLog')}</div>
						<div class="d2l-heading-3">${this.localize('userDetails')}</div>
						<div>
							<span class="d2l-heading-3">${this.localize('headingName')}</span>
							${this.userInfo.DisplayName}
						</div>
						<div>
							<span class="d2l-heading-3">${this.localize('cpdPeriod')}</span>
							${this.localize('range', this.target)}
						</div>
					</div>
					<div class="logo-container">
					</div>
				</div>
				<div class="d2l-heading-2 progress-header">${this.localize('overallProgressSummary')}</div>
				<d2l-progress-overall
					.progress="${this.progress}"
					>
				</d2l-progress-overall>
				<div class="d2l-heading-2 progress-header">${this.localize('subjectProgressSummary')}</div>
				<d2l-progress-subject
					.progress="${this.progress}">
				</d2l-progress-subject>
				${this.records.map(record => this.renderRecord(record))}
			</div>
		`;
	}
}
customElements.define('d2l-cpd-record-report', CpdRecordReport);
