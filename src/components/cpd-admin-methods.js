import { css, html, LitElement } from 'lit-element/lit-element';
import { BaseMixin } from '../mixins/base-mixin';
class CpdAdminMethods extends BaseMixin(LitElement) {
	static get styles() {
		return css``;
	}

	render() {
		return html`Methods
		`;
	}
}
customElements.define('d2l-cpd-admin-methods', CpdAdminMethods);

