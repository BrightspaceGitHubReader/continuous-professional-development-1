import '@brightspace-ui/core/components/button/button.js';
import '@brightspace-ui/core/components/button/button-icon.js';
import '@brightspace-ui/core/components/button/button-subtle.js';
import '@brightspace-ui/core/components/dialog/dialog-confirm.js';
import '@brightspace-ui/core/components/inputs/input-checkbox.js';
import '@brightspace-ui/core/components/inputs/input-search.js';
import '@brightspace-ui/core/components/link/link.js';
import 'd2l-date-picker/d2l-date-picker.js';
import 'd2l-navigation/d2l-navigation-link-back.js';
import 'd2l-table/d2l-table.js';
import './page-select.js';
import './filter-select.js';
import './message-container.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { BaseMixin } from '../mixins/base-mixin.js';
import { CpdServiceFactory } from '../services/cpd-service-factory';
import dayjs from 'dayjs/esm';
import { getHoursAndMinutes } from '../helpers/time-helper.js';
import { selectStyles } from '@brightspace-ui/core/components/inputs/input-select-styles.js';

class MyCpdRecords extends BaseMixin(LitElement) {

	static get properties() {
		return {
			cpdRecords: {
				type: Object
			},
			subjectOptions: {
				type: Array
			},
			methodOptions: {
				type: Array
			},
			subjectFilterEnabled: {
				type: Boolean
			},
			methodFilterEnabled: {
				type: Boolean
			},
			cpdService: {
				type: Object
			},
			page: {
				type: Number
			},
			filters: {
				type: Object
			},
			hideSearchOptions: {
				type: Boolean
			},
			userDisplayName: {
				type: String
			},
			viewUserId: {
				type: Number
			}
		};
	}

	static get styles() {
		return [
			selectStyles,
			css`
			div[role=main] {
				display: grid;
				grid-gap: 1rem;
			}

			d2l-button {
				width: 25%;
			}

			d2l-input-search {
				width: 35%;
			}

			d2l-date-picker {
				width: 7rem;
			}

			.search_bar {
				display: flex;
				align-items: baseline;
			}

			.search_options[disabled] {
				display: none;
			}

			.date_filter_controls {
				width: 16rem;
				display: flex;
				justify-content: space-between;
				align-items: baseline;
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

		this.subjectOptions = [];
		this.methodOptions = [];

		this.subjectFilterEnabled = true;
		this.methodFilterEnabled = true;

		this.cpdService = CpdServiceFactory.getCpdService();

		this.page = 1;

		this.filters = {
			Subject: 0,
			Method: 0,
			Name: 0,
			StartDate: 0,
			EndDate: 0
		};

		this.hideSearchOptions = true;
	}

	async connectedCallback() {
		super.connectedCallback();

		await this.cpdService.getRecordSummary(this.page, this.viewUserId)
			.then(data => {
				this.cpdRecords = data;
			});
		this.cpdService.getSubjects()
			.then(data => {
				this.subjectOptions = data;
			});
		this.cpdService.getMethods()
			.then(data => {
				this.methodOptions = data;
			});
		if (this.viewUserId) {
			this.cpdService.getUserInfo(this.viewUserId)
				.then(data => {
					this.userDisplayName = data;
				});

		}
	}

	backToTeamClicked() {
		this.fireNavigationEvent('my-team-cpd');
	}

	deleteRecordButtonClicked(e) {
		const dialog = this.shadowRoot.querySelector('d2l-dialog-confirm');
		dialog.opened = true;
		const recordId = e.target.getAttribute('record-id');
		if (recordId) {
			dialog.addEventListener('d2l-dialog-close', (e) => {
				if (e.detail.action === 'yes') {
					this.cpdService.deleteRecord(recordId)
						.then(() => {
							this.fetchRecords();
						});
				}
			});
		}
	}

	getType(isStructured) {
		return isStructured ? 'Structured' : 'Unstructured';
	}

	fetchRecords() {
		this.cpdService.getRecordSummary(this.page, this.viewUserId, this.filters)
			.then(data => {
				this.cpdRecords = data;
			});
	}
	newRecordButtonClicked() {
		this.fireNavigationEvent('add-cpd-record');
	}

	recordLinkClicked(e) {
		if (!this.viewUserId) {
			this.fireNavigationEvent(
				'edit-cpd-record',
				e.target.getAttribute('record-id')
			);
		} else {
			this.fireNavigationEvent(
				'read-only-cpd-record',
				e.target.getAttribute('record-id'),
				this.viewUserId
			);
		}

	}

	updatePage(e) {
		this.page = e.detail.page;
		this.fetchRecords();
	}

	updateFilter(e) {
		switch (e.target.id) {
			case 'search_input':
				this.filters.Name = e.detail;
				break;
			case 'subject_select':
				this.filters.Subject = e.detail;
				break;
			case 'method_select':
				this.filters.Method = e.detail;
				break;
			case 'start_date_picker':
				this.filters.StartDate = e.detail;
				break;
			case 'end_date_picker':
				this.filters.EndDate = e.detail;
				break;
		}
		this.page = 1;
		this.fetchRecords();
	}

	toggleSearchOptions() {
		this.hideSearchOptions = !this.hideSearchOptions;
	}

	renderTable() {
		return html`
		<d2l-table
			id="cpd-records"
			aria-label="${this.localize('ariaCpdTable')}"
			>
			<d2l-thead>
				<d2l-tr role="row">
					<d2l-th>
						${this.localize('name')}
					</d2l-th>


					<d2l-th>
						${this.localize('subject')}
					</d2l-th>


					<d2l-th>
						${this.localize('type')}
					</d2l-th>


					<d2l-th>
						${this.localize('method')}
					</d2l-th>


					<d2l-th>
						${this.localize('creditHours')}
					</d2l-th>


					<d2l-th>
						${this.localize('dateCompleted')}
					</d2l-th>
				</d2l-tr>
			</d2l-thead>

			<d2l-tbody>
				${ this.cpdRecords.RecordSummaries.map(record => this.renderRecord(record)) }
			</d2l-tbody>
		</d2l-table>
		<div class="page_control">
			<d2l-page-select
				pages="${this.cpdRecords.TotalPages}"
				page="${this.page}"
				@d2l-page-select-updated="${this.updatePage}"
				>
			</d2l-page-select>
		</div>
		`;
	}

	renderRecord(record) {
		const {recordName} = record;
		return html`
		<d2l-tr role="row">
			<d2l-td>
				<d2l-link @click="${this.recordLinkClicked}" record-id="${record.RecordId}">
					${record.RecordName}
				</d2l-link>
				${this.viewUserId ? html`` : html`
					<d2l-button-icon
						@click="${this.deleteRecordButtonClicked}"
						icon="tier1:delete"
						text="${this.localize('delete', {recordName})}"
						record-id="${record.RecordId}">
					</d2l-button-icon>
					<d2l-dialog-confirm title-text="${this.localize('delete', {recordName})}" text="${this.localize('confirmDeleteRecord')}">
						<d2l-button slot="footer" primary dialog-action="yes">${this.localize('yes')}</d2l-button>
						<d2l-button slot="footer" dialog-action>${this.localize('no')}</d2l-button>
					</d2l-dialog-confirm>
				`}
			</d2l-td>
			<d2l-td>
				${record.SubjectName}
			</d2l-td>
			<d2l-td>
				${this.getType(record.IsStructured)}
			</d2l-td>
			<d2l-td>
				${record.MethodName}
			</d2l-td>
			<d2l-td>
				${getHoursAndMinutes(record.CreditMinutes)}
			</d2l-td>
			<d2l-td>
				${dayjs(record.DateCompleted).format('YYYY-MM-DD')}
			</d2l-td>
		</d2l-tr>
		`;
	}

	renderShowHideButtonText() {
		return this.hideSearchOptions ? this.localize('showSearchOptions') : this.localize('hideSearchOptions');
	}

	render() {
		return html`
			<custom-style>
				<style include="d2l-table-style"></style>
			</custom-style>

			<div role="main">
				${this.viewUserId ? html`

					<div>
						<div>
							<d2l-navigation-link-back
								text="${this.localize('backToTeam')}"
								@click="${this.backToTeamClicked}"
								href="javascript:void(0)">
							</d2l-navigation-link-back>
						</div>
						<h2>
							${this.localize('userTitle', { 'userName': this.userDisplayName})}
						</h2>
					</div>` : html`

					<d2l-button id="new_record" @click="${this.newRecordButtonClicked}">
			${this.localize('addNewCPD')}
					</d2l-button>
				`}

				<div class="search_bar">
					<d2l-input-search
						id="search_input"
						label="${this.localize('search')}"
						placeholder=${this.localize('searchRecordPlaceholder')}
						@d2l-input-search-searched="${this.updateFilter}"
						>
					</d2l-input-search>

					<d2l-button-subtle
						text="${this.renderShowHideButtonText()}"
						@click="${this.toggleSearchOptions}"
						>
					</d2l-button-subtle>
				</div>

				<div
					class="search_options"
					?disabled=${this.hideSearchOptions}
					>
					<d2l-filter-select
						id="subject_select"
						label="${this.localize('subject')}"
						.options=${this.subjectOptions}
						@d2l-filter-select-updated="${this.updateFilter}"
						>
					</d2l-filter-select>

					<d2l-filter-select
						id="method_select"
						label="${this.localize('method')}"
						.options=${this.methodOptions}
						@d2l-filter-select-updated="${this.updateFilter}"
						>
					</d2l-filter-select>

					<div id="date_filter">
						<label id="date_label">${this.localize('dateRange')}</label>
						<div class="date_filter_controls">
							<d2l-date-picker
								id="start_date_picker"
								@d2l-date-picker-value-changed="${this.updateFilter}"
								></d2l-date-picker>
							<label>${this.localize('to')}</label>
							<d2l-date-picker
								id="end_date_picker"
								@d2l-date-picker-value-changed="${this.updateFilter}"
								></d2l-date-picker>
						</div>
					</div>
				</div>
				${this.cpdRecords && this.cpdRecords.RecordSummaries && this.cpdRecords.RecordSummaries.length > 0 ?
		this.renderTable() : html`<d2l-message-container message="${this.localize('noResultsFound')}"></d2l-message-container>`
}
			</div>
			`;
	}
}
customElements.define('d2l-my-cpd-records', MyCpdRecords);
