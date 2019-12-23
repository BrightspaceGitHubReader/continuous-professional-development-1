import '@brightspace-ui/core/components/colors/colors';
import '@brightspace-ui/core/components/icons/icon';
import '@brightspace-ui/core/components/meter/meter-radial';
import '@brightspace-ui/core/components/meter/meter-circle';
import './view-toggle';
import './progress-overall';
import { css, html, LitElement } from 'lit-element/lit-element';
import { BaseMixin } from '../mixins/base-mixin';
import { CpdServiceFactory } from '../services/cpd-service-factory';

class CpdProgressBox extends BaseMixin(LitElement) {
	static get properties() {
		return {
			progress: {
				type: Object
			}
		};
	}
	static get styles() {
		return [
			css`
			d2l-view-toggle {
				padding: 10px 0;
			}
			.progress {
				background-color: var(--d2l-color-sylvite);
				border: 2px solid var(--d2l-color-gypsum);
				border-radius: 0.5em;
			}

			@media (max-width: 929px) {
				.progress {
					width: 420px;
				}
			}

			`];
	}

	constructor() {
		super();
		this.selectedView = 'overall';
		this.cpdService = CpdServiceFactory.getCpdService();
	}
	connectedCallback() {
		super.connectedCallback();
		this.progress = this.cpdService.getProgress()
			.then((data) => this.progress = data);
	}

	viewToggleChanged(e) {
		this.selectedView = e.detail.view;
	}

	renderView(selectedView) {
		if (selectedView === 'overall') {
			return html`
			<d2l-progress-overall
			.progress="${this.progress}"
			></d2l-progress-overall>
			`;
		}
		return html``;
	}

	render() {
		if (!this.progress) {
			return html``;
		}
		const toggleOptions = [
			{
				text: this.localize('overallProgress'),
				val: 'overall'
			},
			{
				text: this.localize('subjectProgress'),
				val: 'subject'
			}
		];
		return html`
		<div class="progress" @d2l-view-toggle-changed=${this.viewToggleChanged}>
			<div>
				<d2l-view-toggle .toggleOptions=${toggleOptions} selectedOption="overall"></d2l-view-toggle>
			</div>
			${this.renderView(this.selectedView)}
		</div>
		`;
	}
}
customElements.define('d2l-cpd-progress-box', CpdProgressBox);
