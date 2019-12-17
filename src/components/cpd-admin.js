
import 'd2l-tabs/d2l-tabs';
import './cpd-admin-job-list';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { BaseMixin } from '../mixins/base-mixin.js';

class CpdAdmin extends BaseMixin(LitElement) {
	static get styles() {
		return css``;
	}
	render() {
		return html`
		<d2l-tabs>
			<d2l-tab-panel
				text="${this.localize('jobTitleTargets')}">
				<d2l-cpd-admin-job-list></d2l-cpd-admin-job-list>
			</d2l-tab-panel>
		</d2l-tabs>`;
	}
}
customElements.define('d2l-cpd-admin', CpdAdmin);
