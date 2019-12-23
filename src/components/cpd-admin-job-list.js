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
			},
			page: {
				type: Number
			}
		};
	}

	static get styles() {
		return [
			cpdTableStyles,
			css`
			.page_control {
				width: 100%;
				display: flex;
				justify-content: center;
			}
			.defaults_column {
				width: 12%;
				text-align: center;
			}
			`
		];
	}

	constructor() {
		super();
		this.cpdService = CpdServiceFactory.getCpdService();
		this.page = 1;
	}

	connectedCallback() {
		super.connectedCallback();
		this.fetchJobs();
	}

	fetchJobs() {
		this.cpdService
			.getJobTitleDefaults(this.page)
			.then(data => (this.jobTargets = data));
	}

	jobTargetLinkClicked(e) {
		this.fireNavigationEvent(
			{
				page: 'cpd-manage-targets',
				jobTitle: e.target.getAttribute('jobTitle')
			}
		);
	}

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
				<td class="defaults_column">
					<d2l-icon
						icon="tier1:${jobTargetData.HasDefaults ? 'check' : 'close-default'}">
					</d2l-icon>
				</td>
			</tr>
		`;
	}

	updatePage(e) {
		this.page = e.detail.page;
		this.fetchJobs();
	}

	render() {
		return html`
			<table>
				<thead>
					<tr>
						<th>${this.localize('jobTitle')}</th>
						<th class="defaults_column">${this.localize('hasDefaults')}</th>
					</tr>
				</thead>
				${this.jobTargets &&
					this.jobTargets.Objects.map(jobTargetData =>
						this.renderJobTitleRow(jobTargetData)
					)}
			</table>
			<div class="page_control">
				<d2l-page-select
					pages="${Math.ceil(this.jobTargets.TotalCount / this.jobTargets.PageSize)}"
					page="${this.page}"
					@d2l-page-select-updated="${this.updatePage}"
					>
				</d2l-page-select>
			</div>
		`;
	}
}
customElements.define('d2l-cpd-admin-job-list', CpdAdminJobList);
