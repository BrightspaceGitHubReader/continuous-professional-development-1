import '@brightspace-ui/core/components/icons/icon.js';
import '@brightspace-ui/core/components/link/link.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { BaseMixin } from '../mixins/base-mixin';
import { CpdServiceFactory } from '../services/cpd-service-factory';
import { cpdTableStyles } from '../styles/cpd-table-styles';

class CpdAdminJobList extends BaseMixin(LitElement) {
	static get properties() {
		return {
			jobTargets: {
				type: Object
			}
		};
	}

	static get styles() {
		return [
			cpdTableStyles,
			css``
		];
	}

	constructor() {
		super();
		this.cpdService = CpdServiceFactory.getCpdService();
	}

	connectedCallback() {
		super.connectedCallback();
		this.cpdService
			.getJobTitleDefaults()
			.then(data => (this.jobTargets = data));
	}

	jobTargetLinkClicked() {}

	renderJobTitleRow(jobTargetData) {
		return html`
			<tr>
				<td>
					<d2l-link
						@click="${this.jobTargetLinkClicked}"
						jobTitle="${jobTargetData.JobTitle}">
						${jobTargetData.JobTitle}
					</d2l-link>
				</td>
				<td>
					<d2l-icon
						icon="tier1:${jobTargetData.HasDefaults ? 'check' : 'close-default'}">
					</d2l-icon>
				</td>
			</tr>
		`;
	}

	render() {
		return html`
			<table>
				<thead>
					<tr>
						<th>${this.localize('jobTitle')}</th>
						<th>${this.localize('hasDefaults')}</th>
					</tr>
				</thead>
				${this.jobTargets &&
					this.jobTargets.Objects.map(jobTargetData =>
						this.renderJobTitleRow(jobTargetData)
					)}
			</table>
		`;
	}
}
customElements.define('d2l-cpd-admin-job-list', CpdAdminJobList);
