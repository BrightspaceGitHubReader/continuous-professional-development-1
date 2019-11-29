import '@brightspace-ui/core/components/inputs/input-search.js';
import '@brightspace-ui/core/components/link/link.js';
import 'd2l-date-picker/d2l-date-picker';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { BaseMixin } from '../mixins/base-mixin.js';

class PendingRecords extends BaseMixin(LitElement) {

	static get properties() {
		return {
		};
	}

	static get styles() {
		return css`
            .inline {
                display: inline-block;
            }
		`;
	}

	render() {
		return html`
		<div>
            <div>
                <d2l-input-search class="inline" label="${this.localize('lblSearchForLabel')}" placeholder="${this.localize('searchFor')}"></d2l-input-search>
                <d2l-link class="inline">${this.localize('lblHideSearchOptions')}</d2l-link>
            </div>
            <h5>${this.localize('lblDateRange')}</h5>
            <div>
                <d2l-date-picker class="inline"></d2l-date-picker> 
                <label>to<label>
                <d2l-date-picker class="inline"></d2l-date-picker>
            </div>
		</div>
		`;
	}
}
customElements.define('d2l-pending-records', PendingRecords);
