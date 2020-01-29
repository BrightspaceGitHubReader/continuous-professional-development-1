import '@brightspace-ui/core/components/colors/colors';
import '@brightspace-ui/core/components/link/link.js';
import { css, html, LitElement } from 'lit-element/lit-element';
import { getHoursRounded, toLocalDate } from  '../helpers/time-helper';
import { BaseMixin } from '../mixins/base-mixin';
import { CpdRoutes } from '../helpers/cpdRoutes';
import { CpdServiceFactory } from '../services/cpd-service-factory';
import { cpdTableStyles } from '../styles/cpd-table-styles';
import { formatDate } from '@brightspace-ui/intl/lib/dateTime';
import { formatTotalProgress } from '../helpers/progress-helper';
import { selectStyles } from '@brightspace-ui/core/components/inputs/input-select-styles';

class CpdWidget extends BaseMixin(LitElement) {
	static get properties() {
		return {
			userId: {
				type: Number
			},
			progress: {
				type: Object
			},
			subjects: {
				type: Array
			},
			selectedView: {
				type: Number
			},
			startDate: {
				type: Date
			},
			endDate: {
				type: Date
			},
			cpdLink: {
				type: String
			}
		};
	}

	static get styles() {
		return [
			selectStyles,
			cpdTableStyles,
			css`
			d2l-meter-circle {
				min-width: 100px;
			}
			span,
			h4 {
				margin: 6px 0px;
			}
			.progress-holder {
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
			}

			.progress-by-type {
				display: grid;
				grid-template-columns: auto auto;
				grid-template-rows: auto auto;
				grid-auto-flow: column;
				text-align: center;
				flex-grow: 1;
			}

			@media only screen and (max-width: 299px) {
				.progress-by-type {
					grid-template-columns: 100%;
					grid-template-rows: auto auto auto;
					justify-items: center;
				}
			}

			.progress-range {
				display: grid;
			}
			.progress-type-header {
				grid-column-end: span 2;
			}
			.progress-overall {
				width: 100%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				background-color: var(--d2l-color-sylvite);
				border: 2px solid var(--d2l-color-gypsum);
				border-radius: 0.5em;
			}
			.progress-specific {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
			}
			.progress-label {
				vertical-align: middle;
			}
			.progress-text,
			.cpd-link {
				margin: 12px 0px;
			}
			.select-subject {
				width: 100%;
				margin: 12px 0px;
			}

			@media only screen and (min-width: 594px) {
				.select-subject {
					max-width: 300px;
				}

				.progress-overall {
					max-width: 300px;
				}
			}
			`]
		;
	}

	constructor() {
		super();
		this.cpdService = CpdServiceFactory.getCpdService();
		this.selectedView = 0;
	}

	connectedCallback() {
		super.connectedCallback();
		this.cpdService.getProgress()
			.then((data) => {
				this.progress = this.lowercasePropertyNames(data);

				this.startDate = toLocalDate(this.progress.startdate);
				this.endDate = toLocalDate(this.progress.enddate);
			});
		this.cpdService.getSubjects()
			.then((data) =>
				this.subjects = data
			);
		this.cpdService.ParentHost(CpdRoutes.CpdHome())
			.then(url => {
				this.cpdLink = url;
			});
	}

	filterChange(e) {
		this.selectedView = Number(e.target.value);
	}

	formatDateString(inputDate) {
		return `${formatDate(inputDate, {format: 'medium'})}`;
	}

	renderSelect(option) {
		return html`
		<option
			value="${option.Id}"
			?selected=${this.selectedView === option.Id}
			>
			${option.Name}
		</option>
		`;
	}

	renderView(selectedView) {
		const progress = selectedView === 0 ?
			this.progress :
			this.progress.subjectprogress.find(x => x.subject.id === this.selectedView);
		const progressString = selectedView === 0 ? this.localize('overallProgress') : progress.subject.name;
		return html `
			<div class="progress-holder">
				${this.renderOverallProgress(progress, progressString)}
				<div class="progress-by-type">
					<h4 class="d2l-heading-4 progress-type-header">${this.localize('progressByType')}</h4>
					${this.renderProgressByType(progress.structured, this.localize('structured'))}
					${this.renderProgressByType(progress.unstructured, this.localize('unstructured'))}
				</div>
			</div>
		`;
	}

	renderOverallProgress(progress, progressString) {
		const data = formatTotalProgress(progress);
		return html`
		<div class="progress-overall">
			<h4 class="d2l-heading-4">${progressString}</h4>
			<d2l-meter-circle
				value="${data.numerator}"
				max="${data.denominator}"
				percent>
			</d2l-meter-circle>
			${this.renderProgressText(data.numerator, data.denominator)}
		</div>`;
	}

	renderProgressByType(progressValues, progressString) {
		return html `
		<div class="progress-specific">
			<h4 class="d2l-heading-4">${progressString}</h4>
			<d2l-meter-radial
				value="${getHoursRounded(progressValues.numerator)}"
				max="${getHoursRounded(progressValues.denominator)}"
				percent>
			</d2l-meter-radial>
			${this.renderProgressText(getHoursRounded(progressValues.numerator), getHoursRounded(progressValues.denominator))}
		</div>
		`;
	}

	renderProgressText(numerator, denominator) {
		return html`
		<div class="progress-text">
			<label class="progress-label">${this.localize('hoursProgress', {numerator, denominator})}</label>
		</div>`;
	}

	render() {
		if (!this.subjects || !this.progress) {
			return html ``;
		}
		return html`
			<div @d2l-view-toggle-changed=${this.viewToggleChanged}>
				<label>
					<div class="progress-range">
						<h4 class="d2l-heading-4">
							${this.localize('progressCurrentPeriod')}
						</h4>
						<span>
							${this.localize('range', {rangeStart: this.formatDateString(this.startDate), rangeEnd: this.formatDateString(this.endDate)})}
						</span>
					</div>
				</label>
				<select
					class="d2l-input-select select-subject"
					@change="${this.filterChange}">
						<option value="0">${this.localize('overallProgress')}</option>
						${this.subjects.map(option => this.renderSelect(option))}
					</select>
				${this.renderView(this.selectedView)}
				<div class="cpd-link">
					<d2l-link target="_parent" href="${this.cpdLink}">${this.localize('goToCpd')}</d2l-link>
				</div>
			</div>
		`;
	}
}
customElements.define('d2l-cpd-widget', CpdWidget);
