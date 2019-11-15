import '@brightspace-ui/core/components/button/button.js';
import 'd2l-table/d2l-table.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { LoadDataMixin } from '../mixins/load-data-mixin.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';

class MyCpdRecords extends LocalizeMixin(LoadDataMixin(LitElement)) {

	static get properties() {
		return {
			cpdRecords: {
				type: Object
			}
		};
	}

	static get styles() {
		return css`
		`;
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

	render() {
		return html`
			<custom-style>
				<style include="d2l-table-style"></style>
			</custom-style>
			<div role="main">
				<d2l-table
					id="cpd-records"
					aria-label="${this.localize('ariaCpdTable')}"
				>
					<d2l-thead>
						<d2l-tr role="row">
							<d2l-th>
								${this.localize('lblIcon')}
							</d2l-th>


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
										<img src="${record.icon}" />
									</d2l-td>
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
			</div>
					`;
	}
}
customElements.define('d2l-my-cpd-records', MyCpdRecords);
