import './message-container';
import '@brightspace-ui/core/components/button/button-icon';
import '@brightspace-ui/core/components/icons/icon';
import '@brightspace-ui/core/components/inputs/input-search';
import './page-select';
import { css, html, LitElement } from 'lit-element/lit-element';
import { BaseMixin } from '../mixins/base-mixin';
import { CpdServiceFactory } from '../services/cpd-service-factory';
import { cpdSharedStyles } from '../styles/cpd-shared-styles';
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
			},
			viewUserId: {
				type: Number
			},
			userDisplayName: {
				type: String
			}
		};
	}

	static get styles() {
		return [
			cpdSharedStyles,
			cpdTableStyles,
			css`
			div[role=main] {
				display: grid;
				grid-gap: 1rem;
			}

			.icon_column {
				width: 30px;
			}

			.profile_image {
				display: flex;
				justify-content: flex-end;
			}

			.userLink {
				vertical-align: middle;
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

		this.filters.ManagingUserId = this.viewUserId;
		this.fetchData();
	}

	attributeChangedCallback(name, oldval, newval) {
		super.attributeChangedCallback(name, oldval, newval);
		if (name === 'viewuserid') {
			this.page = 1;
			this.filters.ManagingUserId = this.viewUserId;
			this.fetchData();
		}
	}

	backToTeamClicked() {
		this.fireNavigationEvent({page: 'cpd-my-team'});
	}

	fetchData() {
		this.cpdService.getMyTeam(this.page, this.filters)
			.then(data => {
				this.myTeam = data;
			});
		if (this.viewUserId) {
			this.cpdService.getUserInfo(this.viewUserId)
				.then(data => {
					this.userDisplayName = data;
				});
		}
	}

	updateFilter(e) {
		this.filters.Name = e.detail;
		this.page = 1;
		this.fetchData();
	}

	updatePage(e) {
		this.page = e.detail.page;
		this.fetchData();
	}

	userClicked(e) {
		this.fireNavigationEvent(
			{
				page: 'cpd-user-records',
				viewUserId: e.target.getAttribute('user-id')
			});
	}

	userTeamClicked(e) {
		this.fireNavigationEvent(
			{
				page: 'cpd-user-team',
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

		<div class="pageControl">
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
					<d2l-link class="userLink" @click="${this.userClicked}" user-id="${report.UserId}">
						${report.DisplayName}
					</d2l-link>
					${ report.HasDirectReports ? html`<d2l-button-icon user-id="${report.UserId}" icon="tier1:group" text="${this.localize('viewTeamCPD')}" @click="${this.userTeamClicked}"></d2l-button-icon>` : html ``}
				</td>
			</tr>
		`;
	}

	renderHeader(viewUserId) {
		if (viewUserId) {
			return html`
				<div>
					<div>
						<d2l-navigation-link-back
							text="${this.localize('backToTeam')}"
							@click="${this.backToTeamClicked}"
							href="javascript:void(0)">
						</d2l-navigation-link-back>
					</div>
					<div class="header">
						<h2>
							${this.localize('userTeam', { 'userDisplayName': this.userDisplayName})}
						</h2>
					</div>
				</div>`;
		}
		return html ``;
	}

	render() {
		return html`
			<div role="main">
				${this.renderHeader(this.viewUserId)}
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
