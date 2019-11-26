import '@brightspace-ui/core/components/button/button.js';
import '@brightspace-ui/core/components/inputs/input-checkbox.js';
import '@brightspace-ui/core/components/inputs/input-search.js';
import 'd2l-date-picker/d2l-date-picker.js';
import 'd2l-table/d2l-table.js';
import './page-select.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { CpdRecordsServiceFactory } from '../services/cpd-records-service-factory';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { selectStyles } from '@brightspace-ui/core/components/inputs/input-select-styles.js';

class MyCpdRecords extends LocalizeMixin(LitElement) {

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
			pageSizeOptions: {
				type: Array
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
				width: 100%;
				display: flex;
				justify-content: center;
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

		this._cpdRecords = {};

		this._subjectOptions = [];
		this._methodOptions = [];

		this.subjectFilterEnabled = true;
		this.methodFilterEnabled = true;

		this.cpdRecordService = CpdRecordsServiceFactory.getRecordsService();
	}

	get cpdRecords() {
		return this._cpdRecords;
	}

	set cpdRecords(val) {
		const oldVal = this._cpdRecords;
		this._cpdRecords = val;
		this.requestUpdate('cpdRecords', oldVal);
	}

	get methodOptions() {
		return this._methodOptions;
	}

	set methodOptions(val) {
		const oldVal = this._methodOptions;
		this._methodOptions = val;
		this.requestUpdate('methodOptions', oldVal);
	}

	get subjectOptions() {
		return this._subjectOptions;
	}

	set subjectOptions(val) {
		const oldVal = this._subjectOptions;
		this._subjectOptions = val;
		this.requestUpdate('subjectOptions', oldVal);
	}

	connectedCallback() {
		super.connectedCallback();

		Promise.all([
			this.cpdRecordService.getRecordSummary(1)
				.then(data => {
					this.cpdRecords = data;
				}),
			this.cpdRecordService.getSubjects()
				.then(data => {
					this.subjectOptions = data;
				}),
			this.cpdRecordService.getMethods()
				.then(data => {
					this.methodOptions = data;
				})
		]);
	}

	serializeSelect(option) {
		return html`
			<option value="${option.Id}">${option.Name}</option>
		`;
	}

	toggleSubjectFilter() {
		this.subjectFilterEnabled = !this.subjectFilterEnabled;
	}

	toggleMethodFilter() {
		this.methodFilterEnabled = !this.methodFilterEnabled;
	}

	getType(isStructured) {
		return isStructured ? 'Structured' : 'Unstructured';
	}

	getPage(e) {
		const page = e.detail.page;
		this.cpdRecordService.getRecordSummary(page)
			.then(res => res.json())
			.then(body => {
				this.cpdRecords = body;
			});
	}

	render() {
		return html`
			<custom-style>
				<style include="d2l-table-style"></style>
			</custom-style>

			<div role="main">
				<d2l-button id="new_record">
					${this.localize('lblAddNewCPD')}
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
								${this.localize('lblCreditMinutes')}
							</d2l-th>


							<d2l-th>
								${this.localize('lblDateAdded')}
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
				</d2l-thead>
				</d2l-table>
				<div class="filter_controls page_control">
					<d2l-page-select 
						pages="${this.cpdRecords.TotalPages}"
						@d2l-page-select-updated="${this.getPage}"
						>
					</d2l-page-select>
				</div>
			</div>
					`;
	}
}
customElements.define('d2l-my-cpd-records', MyCpdRecords);
