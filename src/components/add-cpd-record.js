import '@brightspace-ui/core/components/inputs/input-text.js';
import './attachments';
//import 'd2l-html-editor/d2l-html-editor';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { BaseMixin } from '../mixins/base-mixin.js';
import { CpdRecordsServiceFactory } from '../services/cpd-records-service-factory';

class AddCpdRecord extends BaseMixin(LitElement) {
	static get properties() {
		return {
			questions: {
				type: Array
			}
		};
	}

	static get styles() {
		return css`
		main {
			width: 100%
		}
		ul {
			list-style-type: none;
			padding: 0;
			margin: 0;
		}
		li {
			padding: 8px 16px;
		}
		.numberInput {
			width: 200px;
			padding: 10px;
		};

		`;
	}

	constructor() {
		super();
		this.cpdRecordService = CpdRecordsServiceFactory.getRecordsService();
		this.questions = ['Who is your daddy?'];
	}

	render() {
		return html`
			<main>
				<ul>
					<li>
						<label for="recordName" class=d2l-label-text>${this.localize('name')}</label>
						<d2l-input-text name="recordName"></d2l-input-text>
					</li>
					<li>
						TODO INSERT FILTER COMPONENT
					</li>
					<li>
						<div>
							<div>
								<label for="creditHours" class=d2l-label-text>${this.localize('credits')}</label>
								<d2l-input-text class="numberInput" name="creditHours" placeholder=${this.localize('enterCreditHours')}></d2l-input-text>
								<d2l-input-text class="numberInput" name="creditMinutes" placeholder=${this.localize('enterCreditMinutes')}></d2l-input-text>
							</div>
							<div>
								<label for="gradeValue" class=d2l-label-text>${this.localize('grade')}</label>
								<div name="gradeValue">94.0</div>
							</div>
						</div>
					</li>
					<li>
						<label>${this.localize('addEvidence')}</label>
						<d2l-attachments></d2l-attachments>
					<li>
					${this.questions.map(q => this.renderQuestion(q))}
				</ul>
				<div>
					<d2l-button>${this.localize('save')}</d2l-button>
					<d2l-button>${this.localize('btnCancel')}</d2l-button>
				</div>
			</main>
		`;
	}

	renderQuestion(question) {
		return html`
			<li>
				<label for="answerText">${question}</label>
				<d2l-input-text name="answerText">
			</li>
		`;
	}

}

customElements.define('d2l-add-cpd-record', AddCpdRecord);
