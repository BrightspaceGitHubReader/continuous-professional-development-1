import '@brightspace-ui/core/components/inputs/input-search.js';
import 'd2l-table/d2l-table.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { BaseMixin } from '../mixins/base-mixin.js';

class MyTeamCPD extends BaseMixin(LitElement) {

	static get properties() {
		return {
			reports: {
				type: Array
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

		this.reports = [];
	}

	renderReportsTable() {
		
	}

	render() {
		return html`
			<custom-style>
				<style include="d2l-table-style"></style>
			</custom-style>

			<div role="main">
				<d2l-input-search
					placeholder=${this.localize('searchPlaceholder')}
					@d2l-input-search-searched="${this.updateNameFilter}"
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
	
					</d2l-tbody>
				</d2l-table>
			</div>
		`;
	}
}
customElements.define('d2l-my-team-cpd', MyTeamCPD);
