import '@brightspace-ui/core/components/button/button.js';
import '@brightspace-ui/core/components/button/button-subtle.js';
import '@brightspace-ui/core/components/inputs/input-checkbox.js';
import '@brightspace-ui/core/components/inputs/input-search.js';
import 'd2l-date-picker/d2l-date-picker.js';
import 'd2l-table/d2l-table.js';
import './page-select.js';
import './filter-select.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { BaseMixin } from '../mixins/base-mixin.js';
import { CpdRecordsServiceFactory } from '../services/cpd-records-service-factory';
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
			cpdRecordService: {
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
				width: 40%;
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

		this.cpdRecords = {};

		this.subjectOptions = [];
		this.methodOptions = [];

		this.subjectFilterEnabled = true;
		this.methodFilterEnabled = true;

		this.cpdRecordService = CpdRecordsServiceFactory.getRecordsService();

		this.page = 1;

		this.filters = {
			Subject: 0,
			Method: 0,
			Name: 0
		};

		this.hideSearchOptions = true;
	}

	async connectedCallback() {
		super.connectedCallback();

		await this.cpdRecordService.getRecordSummary(this.page)
			.then(data => {
				this.cpdRecords = data;
			});
		this.cpdRecordService.getSubjects()
			.then(data => {
				this.subjectOptions = data;
			});
		this.cpdRecordService.getMethods()
			.then(data => {
				this.methodOptions = data;
			});
	}

	getType(isStructured) {
		return isStructured ? 'Structured' : 'Unstructured';
	}

	fetchRecords() {
		this.cpdRecordService.getRecordSummary(this.page, this.filters)
			.then(data => {
				this.cpdRecords = data;
			});
	}

	updatePage(e) {
		console.log(e);
		this.page = e.detail.page;
		this.fetchRecords();
	}

	updateSubjectFilter(e) {
		this.filters.Subject = e.detail;
		this.page = 1;
		this.fetchRecords();
	}

	updateMethodFilter(e) {
		this.filters.Method = e.detail;
		this.page = 1;
		this.fetchRecords();
	}

	updateNameFilter(e) {
		this.filters.Name = e.detail;
		this.page = 1;
		this.fetchRecords();
	}

	toggleSearchOptions() {
		this.hideSearchOptions = !this.hideSearchOptions;
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
				<d2l-button id="new_record">
					${this.localize('addNewCPD')}
				</d2l-button>

				<div class="search_bar">
					<d2l-input-search
						id="search_filter"
						placeholder=${this.localize('searchPlaceholder')}
						@d2l-input-search-searched="${this.updateNameFilter}"
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
							label="${this.localize('subject')}"
							.options=${this.subjectOptions}
							@d2l-filter-select-updated="${this.updateSubjectFilter}"	
							>
					</d2l-filter-select>				

					<d2l-filter-select
							label="${this.localize('method')}"
							.options=${this.methodOptions}
							@d2l-filter-select-updated="${this.updateMethodFilter}"	
							>
					</d2l-filter-select>				

					<div id="date_filter">
						<label id="date_label">${this.localize('dateRange')}</label>
						<div class="date_filter_controls">
							<d2l-date-picker></d2l-date-picker>
							<label>${this.localize('to')}</label>
							<d2l-date-picker></d2l-date-picker>
						</div>
					</div>
				</div>

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
								${this.localize('creditMinutes')}
							</d2l-th>


							<d2l-th>
								${this.localize('dateAdded')}
							</d2l-th>
						</d2l-tr>
					</d2l-thead>

					<d2l-tbody>
						${ this.cpdRecords.RecordSummaries && this.cpdRecords.RecordSummaries.map(record => html`
								<d2l-tr role="row">
									<d2l-td>
										${record.RecordName}
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
										${record.CreditMinutes}
									</d2l-td>
									<d2l-td>
										${record.DateAdded}
									</d2l-td>
								</d2l-tr>
							`
	)
}
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
				</div>
			`;
	}
}
customElements.define('d2l-my-cpd-records', MyCpdRecords);
