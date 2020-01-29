import './progress-overall';
import './progress-subject';
import { css, html, LitElement } from 'lit-element/lit-element';
import { getHoursAndMinutes, toLocalDate } from '../helpers/time-helper';
import { BaseMixin } from '../mixins/base-mixin';
import { CpdServiceFactory } from '../services/cpd-service-factory';
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
			css``
		];
	}

	constructor() {
		super();

		this.cpdService = CpdServiceFactory.getCpdService();

		this.userInfo = {};
		this.records = [];
		this.questions = [];
		this.progress = {};
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

	formatDateString(inputDate) {
		return `${formatDate(inputDate, {format: 'medium'})}`;
	}

	renderRecord(record) {
		return html`
			<div>
			${this.localize('headingRecordName')} ${record.RecordName}
			${this.localize('headingCreditHours')} ${this.localize('shortTimeDuration', getHoursAndMinutes(record.CreditMinutes))}
			${this.localize('headingDateCompleted')} ${formatDate(new Date(record.DateCompleted))}
			${this.localize('headingSubject')} ${record.SubjectName}
			${this.localize('headingMethod')} ${record.MethodName}
			${record.Answers.map(answer => this.renderAnswer(answer))}
			</div>
		`;
	}

	renderAnswer(answer) {
		return html`
			<div>
				${this.questions[answer.QuestionId]} ${answer.Text}
			</div>
		`;
	}

	render() {
		return html`
			<h1>${this.localize('userDetails')}</h1>
			<p><b>${this.localize('userNameHeader')}</b> ${this.userInfo.DisplayName}</p>
			<p><b>${this.localize('cpdPeriod')}</b> ${this.localize('range', this.target)}</p>
			<h2>${this.localize('overallProgressSummary')}</h2>
			<d2l-progress-overall
				.progress="${this.progress}"
				>
			</d2l-progress-overall>
			<h2>${this.localize('overallProgressSummary')}</h2>
			<d2l-progress-subject
				.progress="${this.progress}"
				>
			</d2l-progress-subject>
			${this.records.map(record => this.renderRecord(record))}
		`;
	}
}
customElements.define('d2l-cpd-record-report', CpdRecordReport);
