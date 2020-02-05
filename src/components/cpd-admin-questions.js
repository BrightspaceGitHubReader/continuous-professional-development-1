import { css, html, LitElement } from 'lit-element/lit-element';
import { BaseMixin } from '../mixins/base-mixin';
class CpdAdminQuestions extends BaseMixin(LitElement) {
	static get styles() {
		return css``;
	}

	render() {
		return html`Questions
		`;
	}
}
customElements.define('d2l-cpd-admin-questions', CpdAdminQuestions);
