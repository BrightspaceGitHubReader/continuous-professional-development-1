import '@brightspace-ui/core/components/icons/icon.js';
import '@brightspace-ui/core/components/inputs/input-search.js';
import 'd2l-table/d2l-table.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { BaseMixin } from '../mixins/base-mixin.js';
import { ServiceFactory } from '../services/service-factory';

class MyTeamCPD extends BaseMixin(LitElement) {

	static get properties() {
		return {
			reports: {
				type: Object
			},
			page: {
				type: Number
			},
			filters: {
				type: Object
			},
			teamService: {
				type: Object
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

		this.reports = {};
		this.page = 1;
		this.filters = {};
		this.teamService = ServiceFactory.getTeamService();
	}

	connectedCallback() {
		super.connectedCallback();

		this.teamService.getMyTeam(this.page)
			.then(data => {
				this.reports = data;
			});
	}

	fetchReports() {
		this.teamService.getMyTeam(this.page, this.filters)
			.then(data => {
				this.reports = data;
			});
	}

	updateFilter(e) {
		this.filters.Name = e.detail;
		this.page = 1;
		this.fetchReports();
	}

	updatePage(e) {
		this.page = e.detail.page;
		this.fetchReports();
	}

	renderReport(report) {
		return html`
			<d2l-td>
				<d2l-icon icon="tier3:profile-pic"></d2l-icon>
			</d2l-td>		

			<d2l-td>
				${report.DisplayName}
			</d2l-td>
		`;
	}

	render() {
		return html`
			<custom-style>
				<style include="d2l-table-style"></style>
			</custom-style>

			<div role="main">
				<d2l-input-search
					placeholder=${this.localize('searchPlaceholder')}
					@d2l-input-search-searched="${this.updateFilter}"
					>
				</d2l-input-search>

				<d2l-table
					aria-label="${this.localize('ariaCpdTable')}"
					>
					<d2l-tr role="row">
						<d2l-th>
						</d2l-th>

						<d2l-th>
							Employee Name
						</d2l-th>

						<d2l-th>
							Job Title
						</d2l-th>
					</d2l-tr>

					<d2l-tbody>
						${this.reports.Reports.map(report => this.renderReport(report))}
					</d2l-tbody>
				</d2l-table>
			</div>
			<div class="page_control">
					<d2l-page-select
						pages="${this.reports.TotalPages}"
						page="${this.page}"
						@d2l-page-select-updated="${this.updatePage}"
						>
					</d2l-page-select>
				</div>
			</div>
		`;
	}
}
customElements.define('d2l-my-team-cpd', MyTeamCPD);
