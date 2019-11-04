import '@brightspace-ui/core/components/inputs/input-search.js';
import '@brightspace-ui/core/components/link/link.js';
import 'd2l-date-picker/d2l-date-picker';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';

class PendingRecords extends LocalizeMixin(LitElement) {

	static get properties() {
		return {
			prop1: { type: String },
		};
	}

	static get styles() {
		return css`
			:host {
				display: inline-block;
			}
			:host([hidden]) {
				display: none;
            }
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
					translations = await import('../locales/en.js');
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

		this.prop1 = 'PendingRecords';
	}

	render() {
		return html`
		<div>
            <div>
                <d2l-input-search class="inline" label="${this.localize('searchForLabel')}" placeholder="${this.localize('searchFor')}"></d2l-input-search>
                <d2l-link class="inline">${this.localize('hideSearchOptions')}</d2l-link>
            </div>
            <h5>${this.localize('dateRange')}</h5>
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
