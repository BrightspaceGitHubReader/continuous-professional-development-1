import '@brightspace-ui/core/components/button/button.js';
import 'd2l-tabs/d2l-tabs.js';
import './cpd-manage-targets';
import './cpd-my-records';
import './cpd-add-record';
import './cpd-pending-records';
import './cpd-my-team';
import './cpd-read-only-record';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { BaseMixin } from '../mixins/base-mixin.js';

class Cpd extends BaseMixin(LitElement) {

	static get properties() {
		return {
			manager: {
				type: Boolean
			},
			managePersonal: {
				type: Boolean
			},
			pageData: {
				type: Object
			},
			hasEnforcedTarget: {
				type: Boolean
			}
		};
	}

	static get styles() {
		return css``;
	}

	constructor() {
		super();
		this.pageData = {};
		this.manager = false;
		this.managePersonal = false;
		this.hasEnforcedTarget = false;
	}

	handleNavigateEvent(e) {
		this.pageData = e.detail.pageData;
	}

	connectedCallback() {
		super.connectedCallback();
		this.addEventListener('d2l-cpd-navigate', this.handleNavigateEvent);
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		this.removeEventListener('d2l-cpd-navigate', this.handleNavigateEvent);
	}

	render() {
		if (this.pageData.page === 'cpd-manage-targets') {
			return html`<d2l-cpd-manage-targets></d2l-cpd-manage-targets>`;
		}
		if (this.pageData.page === 'cpd-add-record' || this.pageData.page === 'cpd-edit-record') {
			return html`
				<d2l-cpd-add-record recordid="${this.pageData.recordId}" viewuserid="${this.pageData.viewUserId}" awardRecord="${this.pageData.awardData}"></d2l-cpd-add-record>
			`;
		}
		if (this.pageData.page === 'cpd-user-records') {
			return html`
			<d2l-cpd-my-records
				viewuserid="${this.pageData.viewUserId}">
			</d2l-cpd-my-records>
			`;
		}
		if (this.pageData.page === 'cpd-read-only-record') {
			return html`
			<d2l-cpd-read-only-record
				recordId="${this.pageData.recordId}">
			</d2l-cpd-read-only-record>
			`;
		}
		return html`
			<d2l-tabs>
				${this.managePersonal ?
		html`
				<d2l-tab-panel
					text="${this.localize('myCPDHeader')}"
					?selected=${(!this.pageData.page || this.pageData.page === 'cpd-my-records')}
					>
					<d2l-cpd-my-records ?hasEnforcedTarget=${this.hasEnforcedTarget}></d2l-cpd-my-records>
				</d2l-tab-panel>
				<d2l-tab-panel
					text="${this.localize('pendingRecords')}"
					?selected=${this.pageData.page === 'cpd-pending-records'}
					>
					<d2l-cpd-pending-records></d2l-cpd-pending-records>
				</d2l-tab-panel>
				` : html``}

				${this.manager ?
		html`
				<d2l-tab-panel
					text="${this.localize('myTeamCpd')}"
					?selected=${this.pageData.page === 'cpd-my-team'}
					>
					<d2l-cpd-my-team></d2l-cpd-my-team>
				</d2l-tab-panel>
				` : html``}

			</d2l-tabs>
		`;
	}
}
customElements.define('d2l-cpd', Cpd);
