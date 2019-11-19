import '@brightspace-ui/core/components/button/button.js';
import '@brightspace-ui/core/components/inputs/input-checkbox.js';
import '@brightspace-ui/core/components/inputs/input-search.js';
import 'd2l-date-picker/d2l-date-picker.js';
import 'd2l-table/d2l-table.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { LoadDataMixin } from '../mixins/load-data-mixin.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { selectStyles } from '@brightspace-ui/core/components/inputs/input-select-styles.js';

class MyCpdRecords extends LocalizeMixin(LoadDataMixin(LitElement)) {

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
			pageOptions: {
				type: Array
			},
			pageSizeOptions: {
				type: Array
			},
			subjectFilterEnabled: {
				type: Boolean
			},
			methodFilterEnabled: {
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

			.date_filter_controls {
				width: 40%;
				display: flex;
				justify-content: space-between;
				align-items: baseline;
			}

			.page_control {
				width: 7rem;
			}

			.select_filter {
				width: 30%;
			}
			
			.select_filter[enabled=false] {
				pointer-events: none;
				background: #CCC;
				color: #333;
				border: 1px solid #666;
			}

			.select_filter_controls {
				display: flex;
				align-items: baseline;
			}
			`
		];
	}

	static async getLocalizeResources(langs) {
		for await (const lang of langs) {
			let translations;
			switch (lang) {
				case 'en':
					translations = await import('../../locales/en.js');
					break;
			}

			if (translations && translations.val) {
				return {
					language: lang,
					resources: translations.val
				};
			}
		}

		return null;
	}

	constructor() {
		super();

		this.cpdRecordsUrl = '';
		this._cpdRecords = {
			data: []
		};
		this.subjectOptions = [];
		this.methodOptions = [];
		this.pageOptions = [];
		this.pageSizeOptions = [];
		this.subjectFilterEnabled = true;
		this.methodFilterEnabled = true;
	}

	get cpdRecords() {
		return this._cpdRecords;
	}

	set cpdRecords(val) {
		const oldVal = this._cpdRecords;
		this._cpdRecords = val;
		this.requestUpdate('cpdRecords', oldVal);
	}

	connectedCallback() {
		super.connectedCallback();

		this.loadCpdRecords(this.cpdRecordsUrl)
			.then(r => {
				this.cpdRecords = r;
			});

	}

	serializeSelect(option) {
		return html`
			<option value="${option}">${option}</option>
		`;
	}

	toggleSubjectFilter() {
		this.subjectFilterEnabled = !this.subjectFilterEnabled;
	}

	toggleMethodFilter() {
		this.methodFilterEnabled = !this.methodFilterEnabled;
	}

	render() {
		return html`
			<custom-style>
				<style include="d2l-table-style"></style>
			</custom-style>

			<div role="main">
				<d2l-button id="new_record">
					${this.localize('lblNewRecordButton')}
				</d2l-button>

				<d2l-input-search 
					id="search_filter"
					placeholder=${this.localize('lblSearchPlaceholder')}
					>
				</d2l-input-search>	

				<div id="subject_filter">
					<label id="subject_label">${this.localize('lblSubject')}</label>
					<div class="select_filter_controls">
						<d2l-input-checkbox checked id="subject_enable" @change="${this.toggleSubjectFilter}"></d2l-input-checkbox>
						<select  
							class="d2l-input-select select_filter"
							id="subject_select"
							enabled="${this.subjectFilterEnabled}"
							>
							${this.subjectOptions.map(option => this.serializeSelect(option))}
						</select>
					</div>
				</div>

				<div id="method_filter">
					<label id="method_label">${this.localize('lblMethod')}</label>
					<div class="select_filter_controls">
						<d2l-input-checkbox checked id="method_enable" @change="${this.toggleMethodFilter}"></d2l-input-checkbox>
						<select  
							class="d2l-input-select select_filter"
							id="method_select"
							enabled="${this.methodFilterEnabled}"
							>
							${this.methodOptions.map(option => this.serializeSelect(option))}
						</select>
					</div>
				</div>

				<div id="date_filter">
					<label id="date_label">${this.localize('lblDateRange')}</label>
					<div class="date_filter_controls">
						<d2l-date-picker></d2l-date-picker> 
						<label>${this.localize('lblTo')}</label>
						<d2l-date-picker></d2l-date-picker>
					</div>
				</div>

				<d2l-table
					id="cpd-records"
					aria-label="${this.localize('ariaCpdTable')}"
				>
					<d2l-thead>
						<d2l-tr role="row">
							<d2l-th>
								${this.localize('lblName')}
							</d2l-th>


							<d2l-th>
								${this.localize('lblSubject')}
							</d2l-th>


							<d2l-th>
								${this.localize('lblType')}
							</d2l-th>


							<d2l-th>
								${this.localize('lblMethod')}
							</d2l-th>


							<d2l-th>
								${this.localize('lblCreditHours')}
							</d2l-th>


							<d2l-th>
								${this.localize('lblDateAdded')}
							</d2l-th>
						</d2l-tr>
					</d2l-thead>

					<d2l-tbody>
						${ this.cpdRecords.data && this.cpdRecords.data.map(record => html`
								<d2l-tr role="row">
									<d2l-td>
										${record.name}
									</d2l-td>
									<d2l-td>
										${record.subject}
									</d2l-td>
									<d2l-td>
										${record.type}
									</d2l-td>
									<d2l-td>
										${record.method}
									</d2l-td>
									<d2l-td>
										${record.credit_hours}
									</d2l-td>
									<d2l-td>
										${record.date_added}
									</d2l-td>
								</d2l-tr>
							`
	)
}
					</d2l-tbody>
				</d2l-thead>
				</d2l-table>
				<div class="filter_controls">
					<select 
						 class="d2l-input-select page_control" 
						 id="page_select"
						 >
						${this.pageOptions.map(option => this.serializeSelect(option))}
					</select>
					<select 
						 class="d2l-input-select page_control" 
						 id="page_size_select"
						 >
						${this.pageSizeOptions.map(option => this.serializeSelect(option))}
					</select>
				</div>
			</div>
					`;
	}
}
customElements.define('d2l-my-cpd-records', MyCpdRecords);
