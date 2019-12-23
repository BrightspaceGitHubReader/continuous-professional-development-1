import '@brightspace-ui/core/components/button/button.js';
import 'd2l-tabs/d2l-tabs.js';
import './cpd-manage-targets';
import './my-cpd-records';
import './add-cpd-record';
import './pending-records';
import './my-team-cpd';
import './read-only-cpd-record';
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
			return html`<d2l-cpd-manage-targets jobTitle="${this.pageData.jobTitle}"></d2l-cpd-manage-targets>`;
		}
		if (this.pageData.page === 'add-cpd-record' || this.pageData.page === 'edit-cpd-record') {
			return html`
				<d2l-add-cpd-record recordid="${this.pageData.recordId}" viewuserid="${this.pageData.viewUserId}" awardId="${this.pageData.awardId}"></d2l-add-cpd-record>
			`;
		}
		if (this.pageData.page === 'user-cpd-records') {
			return html`
			<d2l-my-cpd-records
				viewuserid="${this.pageData.viewUserId}">
			</d2l-my-cpd-records>
			`;
		}
		if (this.pageData.page === 'read-only-cpd-record') {
			return html`
			<d2l-read-only-cpd-record
				recordId="${this.pageData.recordId}">
			</d2l-read-only-cpd-record>
			`;
		}
		return html`
			<d2l-tabs>
				${this.managePersonal ?
		html`
				<d2l-tab-panel
					text="${this.localize('myCPDHeader')}"
					?selected=${(!this.pageData.page || this.pageData.page === 'my-cpd-records')}
					>
					<d2l-my-cpd-records></d2l-my-cpd-records>
				</d2l-tab-panel>
				<d2l-tab-panel
					text="${this.localize('pendingRecords')}"
					?selected=${this.pageData.page === 'pending-records'}
					>
					<d2l-pending-records></d2l-pending-records>
				</d2l-tab-panel>
				` : null}

				${this.manager ?
		html`
				<d2l-tab-panel
					text="${this.localize('myTeamCpd')}"
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
