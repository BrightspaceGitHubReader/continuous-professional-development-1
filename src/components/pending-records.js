import '@brightspace-ui/core/components/inputs/input-search.js';
import '@brightspace-ui/core/components/link/link.js';
import 'd2l-date-picker/d2l-date-picker';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';

class PendingRecords extends LocalizeMixin(LitElement) {

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
