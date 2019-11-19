import '@brightspace-ui/core/components/button/button.js';
import 'd2l-tabs/d2l-tabs.js';
import './my-cpd-records';
import './pending-records';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';

class Cpd extends LocalizeMixin(LitElement) {

	static get properties() {
		return {
			cpdRecordsUrl: {
				type: String
			}
		};
	}

	static get styles() {
		return css``;
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
		this.demo = false;
	}

	render() {
		return html`
			<d2l-tabs >
				<d2l-tab-panel text="${this.localize('lblCPDHeader')}">
					<d2l-my-cpd-records demo></d2l-my-cpd-records>
				</d2l-tab-panel>
				<d2l-tab-panel text="${this.localize('lblPendingRecords')}">
					<d2l-pending-records></d2l-pending-records>
				</d2l-tab-panel>
			</d2l-tabs>
		`;
	}
}
customElements.define('d2l-cpd', Cpd);
