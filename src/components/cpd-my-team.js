import './message-container.js';
import '@brightspace-ui/core/components/icons/icon.js';
import '@brightspace-ui/core/components/inputs/input-search.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { BaseMixin } from '../mixins/base-mixin.js';
import { CpdServiceFactory } from '../services/cpd-service-factory';
import { cpdTableStyles } from '../styles/cpd-table-styles';

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
			cpdTableStyles,
			css`
			div[role=main] {
				display: grid;
				grid-gap: 1rem;
			}

			d2l-input-search {
				width: 35%;
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
		this.fireNavigationEvent(
			{
				page: 'user-cpd-records',
				viewUserId: e.target.getAttribute('user-id')
			});
	}

	renderTable() {
		return html`
		<table
			aria-label="${this.localize('ariaCpdTable')}"
			>
			<thead>
				<tr>
					<th class="icon_column">
					</th>

					<th>
						${this.localize('employeeName')}
					</th>
				</tr>
			</thead>

			<tbody>
				${this.myTeam.Objects.map(report => this.renderReport(report))}
			</tbody>
		</table>

		<div class="page_control">
			<d2l-page-select
				pages="${ Math.ceil(this.myTeam.TotalCount / this.myTeam.PageSize) }"
				page="${this.page}"
				@d2l-page-select-updated="${this.updatePage}"
				>
			</d2l-page-select>
		</div>
		`;
	}

	renderReport(report) {
		return html`
			<tr role="row">
				<td class="icon_column">
					<div class="profile_image">
						<d2l-icon icon="tier3:profile-pic"></d2l-icon>
					</div>
				</td>

				<td>
					<d2l-link @click="${this.userClicked}" user-id="${report.UserId}">
						${report.DisplayName}
					</d2l-link>
				</td>
			</tr>
		`;
	}

	render() {
		return html`
			<div role="main">
				<d2l-input-search
					label="${this.localize('search')}"
					placeholder=${this.localize('searchTeamPlaceholder')}
					@d2l-input-search-searched="${this.updateFilter}"
					>
				</d2l-input-search>

					${ this.myTeam && this.myTeam.Objects && this.myTeam.Objects.length > 0 ?
		this.renderTable() : html`<d2l-message-container message="${this.localize('noResultsFound')}"></d2l-message-container>`
}

			</div>
		`;
	}
}
customElements.define('d2l-cpd-my-team', MyTeamCPD);
