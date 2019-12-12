import './message-container.js';
import '@brightspace-ui/core/components/icons/icon.js';
import '@brightspace-ui/core/components/inputs/input-search.js';
import 'd2l-table/d2l-table.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { BaseMixin } from '../mixins/base-mixin.js';
import { CpdServiceFactory } from '../services/cpd-service-factory';

class MyTeamCPD extends BaseMixin(LitElement) {

	static get properties() {
		return {
			myTeam: {
				type: Object
			},
			page: {
				type: Number
			},
			filters: {
				type: Object
			},
			cpdService: {
				type: Object
			}
		};
	}

	static get styles() {
		return [
			css`
			div[role=main] {
				display: grid;
				grid-gap: 1rem;
			}

			.icon_column {
				width: 10%;
			}

			.profile_image {
				display: flex;
				justify-content: flex-end;
			}

			.page_control {
				width: 100%;
				display: flex;
				justify-content: center;
			}
			`
		];
	}

	constructor() {
		super();

		this.myTeam = {
			Objects: []
		};
		this.page = 1;
		this.filters = {};
		this.cpdService = CpdServiceFactory.getCpdService();
	}

	connectedCallback() {
		super.connectedCallback();

		this.cpdService.getMyTeam(this.page)
			.then(data => {
				this.myTeam = data;
			});
	}

	fetchReports() {
		this.cpdService.getMyTeam(this.page, this.filters)
			.then(data => {
				this.myTeam = data;
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

	userClicked(e) {
		this.fireNavigationEvent('user-cpd-records', undefined, e.target.getAttribute('user-id'));
	}

	renderTable() {
		return html`
		<d2l-table
			aria-label="${this.localize('ariaCpdTable')}"
			>
			<d2l-thead>
				<d2l-tr role="row">
					<d2l-th class="icon_column">
					</d2l-th>

					<d2l-th>
						${this.localize('employeeName')}
					</d2l-th>
				</d2l-tr>
			</d2l-thead>

			<d2l-tbody>
				${this.myTeam.Objects.map(report => this.renderReport(report))}
			</d2l-tbody>
		</d2l-table>
		`;
	}

	renderReport(report) {
		return html`
			<d2l-tr>
				<d2l-td class="icon_column">
					<div class="profile_image">
						<d2l-icon icon="tier3:profile-pic"></d2l-icon>
					</div>
				</d2l-td>

				<d2l-td>
					<d2l-link @click="${this.userClicked}" user-id="${report.UserId}">
						${report.DisplayName}
					</d2l-link>
				</d2l-td>
			</d2l-tr>
		`;
	}

	render() {
		return html`
			<custom-style>
				<style include="d2l-table-style"></style>
			</custom-style>

			<div role="main">
				<d2l-input-search
					label="${this.localize('search')}"
					placeholder=${this.localize('searchTeamPlaceholder')}
					@d2l-input-search-searched="${this.updateFilter}"
					>
				</d2l-input-search>

					${ this.myTeam.Objects && this.myTeam.Objects.length > 0 ?
		this.renderTable() : html`<d2l-message-container message="${this.localize('noResultsFound')}"></d2l-message-container>`
}

				<div class="page_control">
					<d2l-page-select
						pages="${this.myTeam.TotalPages}"
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
