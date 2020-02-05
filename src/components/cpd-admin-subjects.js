import { css, html, LitElement } from 'lit-element/lit-element';
import { BaseMixin } from '../mixins/base-mixin';
class CpdAdminSubjects extends BaseMixin(LitElement) {
	static get styles() {
		return css``;
	}

	render() {
		return html`Subjects
		`;
	}
}
customElements.define('d2l-cpd-admin-subjects', CpdAdminSubjects);
