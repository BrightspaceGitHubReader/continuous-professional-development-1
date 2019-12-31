
import 'd2l-navigation/d2l-navigation-link-back.js';
import '@brightspace-ui/core/components/button/button-icon';
import '@brightspace-ui/core/components/button/button';
import '@brightspace-ui/core/components/dialog/dialog.js';
import '@brightspace-ui/core/components/inputs/input-checkbox';
import '@brightspace-ui/core/components/inputs/input-text';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { getHours, getHoursAndMinutesString, getListOfMonths, getMinutes, getTotalMinutes } from  '../helpers/time-helper.js';
import { BaseMixin } from '../mixins/base-mixin.js';
import { CpdServiceFactory } from '../services/cpd-service-factory';
import { cpdTableStyles } from '../styles/cpd-table-styles';
import { selectStyles } from '@brightspace-ui/core/components/inputs/input-select-styles.js';

class ManageCpdTargets extends BaseMixin(LitElement) {
	static get properties() {
		return {
			subjectTargets: {
				type: Object
			},
			selectedTargetMonth: {
				type: Number
			},
			selectedTargetDay: {
				type: Number
			},
			months: {
				type: Array
			},
			days: {
				type: Array
			},
			showTargetDate: {
				type: Boolean
			},
			currentSelectedMonth: {
				type: Number
			},
			jobTitle: {
				type: String
			},
			dialogData: {
				type: Object
			}
		};
	}

	static get styles() {
		return [
			selectStyles,
			cpdTableStyles,
			css`
			span.selected-date {
				font-weight: bold;
			}
			.dialog-grid {
				display: grid;
				grid-template-columns: 1fr 1fr;
				grid-gap: 25px;
			}
			label {
				font-weight: bold;
			}
			`
		];
	}

	constructor() {
		super();
		this.cpdService = CpdServiceFactory.getCpdService();
		this.showTargetDate = false;
		this.months = getListOfMonths();
		this.currentSelectedMonth = 1;
		this.dialogData = {};
	}

	async connectedCallback() {
		super.connectedCallback();
		this.fetchTargets();
	}

	fetchTargets() {
		this.cpdService.getSubjectTargets(this.jobTitle)
			.then(body => {
				this.subjectTargets = body;
			});
	}

	render() {
		return html`
			<main>
				<d2l-navigation-link-back
					text="${(this.jobTitle) ? this.localize('backToJobCpd') : this.localize('backToMyCPD')}"
					@click="${this.backLinkClicked}"
					href="javascript:void(0)">
				</d2l-navigation-link-back>
				<h2>${(this.jobTitle) ? this.localize('manageJobTargets') : this.localize('managePersonalTargets')}</h2>

				<h3>${this.localize('targetStartDay')}</h3>
				<p>
					${this.localize('targetStartDayDescription')}
				</p>

				<d2l-input-checkbox @change="${this.setShowTargetDate}" id="start-date-checkbox">
					${this.localize('selectTargetDay')}
				</d2l-input-checkbox>
				${this.showTargetDate ? html`
						<p>
							<span class="selected-date">
								${this.localize('selectedTargetDay')}
							</span>
							: January 01
							<d2l-button-icon
								icon="tier1:edit"
								@click="${this.openTargetDateDialog}">
							</d2l-button-icon>
						</p>
						` : ''}
				<d2l-dialog id="target-start-date-dialog" title-text="${this.localize('targetStartDay')}">
					<div class="dialog-grid">
						<label for="monthSelect">${this.localize('month')}</label>
						<label for="daySelect">${this.localize('day')}</label>
						<select
							@change="${this.setCurrentSelectedMonth}"
							aria-label="${this.localize('chooseChoice', {choice: this.localize('month')})}"
							class="d2l-input-select"
							id="monthSelect"
						>
							${this.months.map((month, index) => this.renderSelect(month, index + 1, this.selectedTargetMonth))}
						</select>
						${this.renderDaySelect(this.currentSelectedMonth)}
					</div>
					<d2l-button slot="footer" primary dialog-action @click="${this.saveTargetDate}">${this.localize('save')}</d2l-button>
					<d2l-button slot="footer" dialog-action>${this.localize('cancel')}</d2l-button>
				</d2l-dialog>


				<h3>${this.localize('subjectTargets')}</h3>
				<table aria-label="${this.localize('ariaTargetsTable')}">
					<thead>
						<tr>
							<th class="icon_column">
								${this.localize('subject')}
							</th>
							<th>
								${this.localize('structured')}
							</th>
							</th>
							<th>
								${this.localize('unstructured')}
							</th>
							<th>
								${this.localize('total')}
							</th>
						</tr>
					</thead>

					<tbody>
						${this.subjectTargets.Subjects.map(subject => this.renderSubjectTargets(subject))}
					</tbody>
				</table>

				<d2l-dialog id="subject-target-hours-dialog" title-text="${this.localize('subjectTargets')}">
					<div class="dialog-grid">
						<div>
							<label for="structured">${this.localize('structured')}</label>
							<div id="structured">
								<label for="structuredHours">${this.localize('hours')}</label>
								<d2l-input-text
									@change="${this.onDialogDataUpdated}"
									id="structuredHours"
									class="numberInput"
									required type="number"
									min="0"
									value="${getHours(this.dialogData.StructuredMinutes)}"
								>
								</d2l-input-text>
								<label for="structuredMinutes">${this.localize('minutes')}</label>
								<d2l-input-text
									@change="${this.onDialogDataUpdated}"
									id="structuredMinutes"
									class="numberInput"
									required type="number"
									min="0"
									max="59"
									value="${getMinutes(this.dialogData.StructuredMinutes)}"
								>
								</d2l-input-text>
							</div>
						</div>
						<div>
							<label for="unstructured">${this.localize('unstructured')}</label>
							<div id="unstructured">
								<label for="unstructuredHours">${this.localize('hours')}</label>
								<d2l-input-text
									@change="${this.onDialogDataUpdated}"
									id="unstructuredHours"
									class="numberInput"
									required
									type="number"
									min="0"
									value="${getHours(this.dialogData.UnstructuredMinutes)}"
								>
								</d2l-input-text>
								<label for="unstructuredMinutes">${this.localize('minutes')}</label>
								<d2l-input-text
									@change="${this.onDialogDataUpdated}"
									id="unstructuredMinutes"
									class="numberInput"
									required
									type="number"
									min="0"
									max="59"
									value="${getMinutes(this.dialogData.UnstructuredMinutes)}"
								>
								</d2l-input-text>
							</div>
						</div>
					</div>
					<d2l-button slot="footer" primary dialog-action @click="${this.saveTargets}">${this.localize('save')}</d2l-button>
					<d2l-button slot="footer" dialog-action>${this.localize('cancel')}</d2l-button>
				</d2l-dialog>
			</main>
		`;
	}

	renderSubjectTargets(subject) {
		return html`
			<tr>
				<td>
					${subject.Subject.Name}
					<d2l-button-icon
						subject-json="${JSON.stringify(subject)}"
						icon="tier1:edit"
						text="${this.localize('editSubjectTarget', {subject: subject.Subject.Name})}"
						@click="${this.openSubjectTargetDialog}">
					</d2l-button-icon>
				</td>
				<td>${getHoursAndMinutesString(subject.StructuredMinutes)}</td>
				<td>${getHoursAndMinutesString(subject.UnstructuredMinutes)}</td>
				<td>${getHoursAndMinutesString(subject.StructuredMinutes + subject.UnstructuredMinutes)}</td>
			</tr>
		`;
	}

	backLinkClicked() {
		if (!this.jobTitle) {
			this.fireNavigationEvent({page:'cpd-user-records'});
		} else {
			this.fireNavigationEvent({page:'admin-job-list'});
		}
	}

	renderSelect(option, optionIndex, selectedOption) {
		return html`
		<option
			value="${optionIndex}"
			?selected=${selectedOption === optionIndex}
			>
			${option.Name}
		</option>
		`;
	}

	onDialogDataUpdated(e) {
		const number = parseInt(e.target.value);
		switch (e.target.id) {
			case 'structuredHours':
				this.dialogData.StructuredMinutes = getTotalMinutes(number, getMinutes(this.dialogData.StructuredMinutes));
				break;
			case 'structuredMinutes':
				this.dialogData.StructuredMinutes = getTotalMinutes(getHours(this.dialogData.StructuredMinutes), number);
				break;
			case 'unstructuredHours':
				this.dialogData.UnstructuredMinutes = getTotalMinutes(number, getMinutes(this.dialogDataUnstructuredMinutes));
				break;
			case 'unstructuredMinutes':
				this.dialogData.UnstructuredMinutes = getTotalMinutes(getHours(this.dialogData.UnstructuredMinutes), number);
				break;
		}
	}

	openTargetDateDialog() {
		this.shadowRoot.querySelector('#target-start-date-dialog').open();
	}

	openSubjectTargetDialog(e) {
		const subject = e.target.getAttribute('subject-json') &&
			JSON.parse(e.target.getAttribute('subject-json'));
		this.dialogData = {
			SubjectId: subject.Subject.Id,
			StructuredMinutes: subject.StructuredMinutes,
			UnstructuredMinutes: subject.UnstructuredMinutes
		};
		this.shadowRoot.querySelector('#subject-target-hours-dialog').open();
	}

	saveTargetDate() {
		this.cpdService.saveTargetDate(this.jobTitle);
	}

	saveTargets() {
		this.cpdService.updateTarget(this.jobTitle, this.dialogData)
			.then(() => this.fetchTargets());
	}

	setShowTargetDate() {
		const checkbox = this.shadowRoot.querySelector('#start-date-checkbox');
		if (checkbox.checked) {
			this.showTargetDate = true;
		} else {
			this.showTargetDate = false;
		}
	}

	renderDaySelect(month) {
		const numberOfDays = this.months[parseInt(month) - 1].NumberOfDays;
		const days = Array.from({
			length: numberOfDays
		}, (v, index) => {
			return {
				Name: index + 1
			};
		});
		return html`
		<select
			aria-label="${this.localize('chooseChoice', {choice: this.localize('day')})}"
			class="d2l-input-select"
			id="daySelect"
		>
			${days.map((day, index) => this.renderSelect(day, index + 1, 1))}
		</select>
		`;
	}

	setCurrentSelectedMonth(event) {
		this.currentSelectedMonth = event.target.value;
	}
}

customElements.define('d2l-cpd-manage-targets', ManageCpdTargets);
