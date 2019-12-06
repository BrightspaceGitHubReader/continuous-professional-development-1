import '@brightspace-ui/core/components/button/button.js';
import 'd2l-tabs/d2l-tabs.js';
import './my-cpd-records';
import './add-cpd-record';
import './pending-records';
import './my-team-cpd.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { BaseMixin } from '../mixins/base-mixin.js';

class Cpd extends BaseMixin(LitElement) {

	static get properties() {
		return {
			manager: {
				type: Boolean
			},
			pageData: {
				type: Object
			}
		};
	}

	static get styles() {
		return css``;
	}

	constructor() {
		super();
		this.pageData = {};
	}

	handleNavigateEvent(e) {
		this.pageData = e.detail;
	}

	navigateToMyTeamCpd() {
		this.page = 'my-team-cpd';
	}

	render() {
		if (this.pageData.page === 'add-cpd-record' || this.pageData.page === 'edit-cpd-record') {
			return html`
				<d2l-add-cpd-record @d2l-navigate="${this.handleNavigateEvent}" recordid="${this.pageData.recordId}"></d2l-add-cpd-record>
			`;
		}
		if (this.pageData.page === 'user-cpd-records') {
			return html`
			<d2l-my-cpd-records viewuserid="${this.pageData.viewUserId}"></d2l-my-cpd-records>
			`;
		}
		return html`
			<d2l-tabs>
				<d2l-tab-panel
					text="${this.localize('myCPDHeader')}"
					?selected=${(!this.pageData.page || this.pageData.page === 'my-cpd-records')}
					>
					<d2l-my-cpd-records @d2l-navigate="${this.handleNavigateEvent}"></d2l-my-cpd-records>
				</d2l-tab-panel>
				<d2l-tab-panel
					text="${this.localize('pendingRecords')}"
					?selected=${this.pageData.page === 'pending-records'}
					>
					<d2l-pending-records></d2l-pending-records>
				</d2l-tab-panel>
				${this.manager ?
		html`
				<d2l-tab-panel
					text="My Team CPD"
					?selected=${this.pageData.page === 'my-team-cpd'}
					>
					<d2l-my-team-cpd></d2l-my-team-cpd>
				</d2l-tab-panel>
				` : null}
			</d2l-tabs>
		`;
	}
}
customElements.define('d2l-cpd', Cpd);
