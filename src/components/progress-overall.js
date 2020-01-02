import '@brightspace-ui/core/components/icons/icon.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { BaseMixin } from '../mixins/base-mixin.js';
import { bodyCompactStyles } from '@brightspace-ui/core/components/typography/styles.js';
import {formatTotalProgress} from '../helpers/progress-helper';
class ProgressOverall extends BaseMixin(LitElement) {
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
			css`
			.progress-inner {
				margin: 10px;
				border: 2px solid var(--d2l-color-gypsum);
				border-radius: 0.5em;
				background-color: var(--d2l-color-regolith);
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				justify-content: space-between;
				align-items: center;
			}
			.progress-inner-meter {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
			}
			.progress-inner-split {
				max-width: 450px;
				display: grid;
				grid-template-columns: 50% 50%;
				grid-template-rows: 5fr 3fr;
			}
			d2l-meter-circle {
				min-width: 100px;
				padding: 0 10px;
			}
			d2l-meter-radial {
				min-width: 100px;
			}
			.progress-inner-chevron > d2l-icon {
				color: var(--d2l-color-corundum);
			}
			.progress-split-text {
				grid-row: 2;
				grid-column: 1 / span 2;
				padding: 10px 20px;
			}
			.progress-inner-summary {
				display: flex;
				align-items: center;
			}
			.progress-inner-summary > div {
				max-width: 200px;
				padding: 20px;
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
			.progress-inner-circle {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
			}
			@media (max-width: 929px) {
				.progress-inner-chevron {
					display: none;
				}
			}
			`
		];
	}
	getTotals() {
		return formatTotalProgress(this.progress);
	}

	renderProgressText(numerator, denominator) {
		return html`
		<div class="progress-text">
			${numerator >= denominator ? html`
				<d2l-icon class="check-icon" icon="tier2:check-circle"></d2l-icon>
			` : null}
			<label class="progress-label">${`${numerator}/${denominator} ${this.localize('hours')}`}</label>
		</div>`;
	}

	render() {
		if (!this.progress.structured || !this.progress.unstructured) {
			return null;
		}
		const {structured, unstructured} = this.progress;
		return html`
		<div class="progress-inner">
			<div class="progress-inner-split">
				<div class="progress-inner-meter">
					<h4 class="d2l-heading-4">${this.localize('structured')}</h4>
					<d2l-meter-radial
						value="${structured.numerator}"
						max="${structured.denominator}"
						percent>
					</d2l-meter-radial>
					${this.renderProgressText(structured.numerator, structured.denominator)}
				</div>
				<div class="progress-inner-meter">
					<h4 class="d2l-heading-4">${this.localize('unstructured')}</h4>
					<d2l-meter-radial
						value="${unstructured.numerator}"
						max="${unstructured.denominator}"
						percent>
					</d2l-meter-radial>
					${this.renderProgressText(unstructured.numerator, unstructured.denominator)}
				</div>
				<div class="progress-split-text d2l-body-compact">
					${this.localize('overallSplitText', { total:
						unstructured.denominator + structured.denominator, structured: structured.numerator, unstructured: unstructured.numerator})}
				</div>
			</div>
			<div class="progress-inner-chevron">
				<d2l-icon icon="tier3:chevron-right"></d2l-icon>
			</div>
			<div class="progress-inner-summary">
				<div class="progress-inner-circle">
					<d2l-meter-circle
						value="${this.getTotals().numerator}"
						max="${this.getTotals().denominator}"
						percent>
					</d2l-meter-circle>
					${this.renderProgressText(this.getTotals().numerator, this.getTotals().denominator)}
				</div>
				<div class="d2l-body-compact">
					<h4>${this.localize('myTargetsProgress')}</h4>
					<div>
						${this.localize('overallCombinedText', this.getTotals())}
					</div>
				</div>
			</div>
		</div>
		`;
	}
}
customElements.define('d2l-progress-overall', ProgressOverall);
