import '@brightspace-ui/core/components/button/button.js';
import 'd2l-tabs/d2l-tabs.js';
import './my-cpd-records';
import './add-cpd-record';
import './pending-records';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { BaseMixin } from '../mixins/base-mixin.js';

class Cpd extends BaseMixin(LitElement) {

	static get properties() {
		return {
			page: {
				type: String
			}
		};
	}

	static get styles() {
		return css``;
	}

	render() {
		return html`
				<d2l-add-cpd-record></d2l-add-cpd-record>
			`;
	}
}
customElements.define('d2l-cpd', Cpd);
