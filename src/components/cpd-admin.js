
import 'd2l-tabs/d2l-tabs';
import './cpd-admin-job-list';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { BaseMixin } from '../mixins/base-mixin.js';

class CpdAdmin extends BaseMixin(LitElement) {
	static get properties() {
		return {
			pageData: {
				type: Object
			}
		};
	}
	static get styles() {
		return css``;
	}
	onNavigate(e) {
		this.pageData = e.detail;
	}
	render() {
		return html`
		<d2l-tabs>
			<d2l-tab-panel
				@d2l-navigate="${this.onNavigate}"
				text="${this.localize('jobTitleTargets')}">
				<d2l-cpd-admin-job-list></d2l-cpd-admin-job-list>
			</d2l-tab-panel>
		</d2l-tabs>`;
	}
}
customElements.define('d2l-cpd-admin', CpdAdmin);
