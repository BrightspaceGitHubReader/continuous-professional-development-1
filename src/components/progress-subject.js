import '@brightspace-ui/core/components/meter/meter-linear';
import '@brightspace-ui/core/components/meter/meter-radial';
import { css, html, LitElement } from 'lit-element/lit-element';
import { BaseMixin } from '../mixins/base-mixin';
import { bodyCompactStyles } from '@brightspace-ui/core/components/typography/styles';
import { cpdTableStyles } from '../styles/cpd-table-styles';
import { formatTotalProgress } from '../helpers/progress-helper';
import { getHoursRounded } from '../helpers/time-helper';

class ProgressSubject extends BaseMixin(LitElement) {
	static get properties() {
		return {
			progress: {
				type: Object
			}
		};
	}
	static get styles() {
		return [
			bodyCompactStyles,
			cpdTableStyles,
			css`
			.combined-div {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
			}
			.progress-text {
				padding: 12px;
			}
			.check-icon {
				color: green;
			}
			.progress-label: {
				vertical-align: middle;
			}
			`
		];
	}

	renderProgressText(numerator, denominator) {
		return html`
		<div class="progress-text">
			${numerator >= denominator && denominator > 0 ? html`
				<d2l-icon class="check-icon" icon="tier2:check-circle"></d2l-icon>
			` : null}
			<label class="progress-label">${`${this.localize('hoursProgress', {numerator, denominator})}`}</label>
		</div>`;
	}

	renderRow(subjectData) {
		return html`
		<tr role="row">
			<td>
				${subjectData.subject.name}
			</td>
			<td>
				<d2l-meter-linear
					value="${getHoursRounded(subjectData.structured.numerator)}"
					max="${getHoursRounded(subjectData.structured.denominator)}"
					text="${this.localize('completed')}{x}/{y}"
					percent>
				</d2l-meter-linear>				
			</td>
			<td>
				<d2l-meter-linear
					value="${getHoursRounded(subjectData.unstructured.numerator)}"
					max="${getHoursRounded(subjectData.unstructured.denominator)}"
					text="${this.localize('completed')}{x}/{y}"
					percent>
				</d2l-meter-linear>
			</td>
			<td>
				<div class="combined-div">
					<d2l-meter-radial
						value="${formatTotalProgress(subjectData).numerator}"
						max="${formatTotalProgress(subjectData).denominator}"
						percent>
					</d2l-meter-radial>
					${this.renderProgressText(formatTotalProgress(subjectData).numerator, formatTotalProgress(subjectData).denominator)}
				</div>
			</td>
		</tr>
		`;
	}

	renderTable() {
		return html`
		<table
			aria-label="${this.localize('ariaSubjectProgressTable')}"
			>
			<thead>
				<tr>
					<th>
						${this.localize('subject')}
					</th>
					<th>
						${this.localize('structured')}
					</th>
					<th>
						${this.localize('unstructured')}
					</th>
					<th>
						${this.localize('combined')}
					</th>
				</tr>
			</thead>
			<tbody>
				${ this.progress.subjectprogress.map(subject => this.renderRow(subject)) }
			</tbody>
		</table>
		`;
	}

	render() {
		if (!this.progress.subjectprogress || this.progress.subjectprogress.length === 0) {
			return html`<d2l-message-container message="${this.localize('noResultsFound')}"></d2l-message-container>`;
		}
		return this.renderTable();
	}
}
customElements.define('d2l-progress-subject', ProgressSubject);
