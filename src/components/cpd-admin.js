
import 'd2l-tabs/d2l-tabs';
import './cpd-admin-job-list';
import './cpd-manage-targets';
import { css, html, LitElement } from 'lit-element/lit-element';
import { BaseMixin } from '../mixins/base-mixin';

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
	connectedCallback() {
		super.connectedCallback();
		this.addEventListener('d2l-cpd-navigate', this.handleNavigateEvent);
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		this.removeEventListener('d2l-cpd-navigate', this.handleNavigateEvent);
	}
	handleNavigateEvent(e) {
		this.pageData = e.detail.pageData;
	}
	render() {
		if (this.pageData && this.pageData.page === 'cpd-manage-targets') {
			return html`<d2l-cpd-manage-targets jobTitle="${this.pageData.jobTitle}"></d2l-cpd-manage-targets>`;
		}
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
