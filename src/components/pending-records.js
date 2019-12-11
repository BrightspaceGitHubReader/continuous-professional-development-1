import '@brightspace-ui/core/components/button/button-icon';
import '@brightspace-ui/core/components/icons/icon.js';
import '@brightspace-ui/core/components/inputs/input-search.js';
import '@brightspace-ui/core/components/link/link.js';
import 'd2l-table/d2l-table.js';
import 'd2l-menu/d2l-menu';
import 'd2l-dropdown/d2l-dropdown';
import 'd2l-dropdown/d2l-dropdown-menu';
import 'd2l-date-picker/d2l-date-picker';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { BaseMixin } from '../mixins/base-mixin.js';
import { CpdServiceFactory } from '../services/cpd-service-factory';

class PendingRecords extends BaseMixin(LitElement) {
	static get properties() {
		return {
			pendingRecords: {
				type: Array
			}
		};
	}

	static get styles() {
		return css`
			div[role=main] {
				display: grid;
				grid-gap: 1rem;
			}
		`;
	}

	constructor() {
		super();
		this.cpdService = CpdServiceFactory.getCpdService();
	}

	connectedCallback() {
		super.connectedCallback();

		this.cpdService.getPendingRecords()
			.then(data => {
				this.pendingRecords = data.Objects;
			});
	}

	addAwardButtonClicked(e) {
		const awardId = e.target.getAttribute('data-award-id');
		this.fireNavigationEvent('add-cpd-record', undefined, undefined, awardId);
	}

	renderAward(award) {
		return html`
			<d2l-tr role="row">
				<d2l-td class="icon_column">
					<div class="profile_image">
						<d2l-icon icon="tier3:profile-pic"></d2l-icon>
					</div>
				</d2l-td>

				<d2l-td>
					${award.Name}
					<d2l-dropdown>
						<d2l-button-icon text="${this.localize('options')}" icon="tier1:arrow-collapse" class="d2l-dropdown-opener"></d2l-button-icon>
						<d2l-dropdown-menu>
							<d2l-menu>
								<d2l-menu-item
									data-award-id="${award.IssuedAwardId}"
									text="${this.localize('addToMyCpd')}"
									@click="${this.addAwardButtonClicked}">
									</d2l-menu-item>
							</d2l-menu>
						</d2l-dropdown-menu>
					</d2l-dropdown>
				</d2l-td>
				<d2l-td>
					${award.IssuedDate}
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
				<d2l-table
					aria-label="${this.localize('ariaPendingRecordsTable')}"
					>
					<d2l-thead>
						<d2l-tr role="row">
							<d2l-th class="icon_column">
							</d2l-th>
							<d2l-th>
								${this.localize('name')}
							</d2l-th>
							<d2l-th>
								${this.localize('dateIssued')}
							</d2l-th>
						</d2l-tr>
					</d2l-thead>

					<d2l-tbody>
						${this.pendingRecords && this.pendingRecords.map(award => this.renderAward(award))}
					</d2l-tbody>
				</d2l-table>
			</div>
		`;
	}
}
customElements.define('d2l-pending-records', PendingRecords);
