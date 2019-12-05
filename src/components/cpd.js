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
			page: {
				type: String
			},
			recordId: {
				type: Number
			}
		};
	}

	static get styles() {
		return css``;
	}

	navigateToAddCpd() {
		this.page = 'add-cpd-record';
	}

	navigateToEditCpd(e) {
		this.recordId = e.detail.recordId;
		this.page = 'edit-cpd-record';
	}

	navigateToMyCpd() {
		this.page = 'my-cpd-records';
	}

	navigateToMyTeamCpd() {
		this.page = 'my-team-cpd';
	}

	render() {
		if (this.page === 'add-cpd-record') {
			return html`
				<d2l-add-cpd-record @d2l-navigate-my-cpd="${this.navigateToMyCpd}"><d2l-add-cpd-record>
			`;
		}
		if (this.page === 'edit-cpd-record') {
			return html`
				<d2l-add-cpd-record @d2l-navigate-my-cpd="${this.navigateToMyCpd}" recordid="${this.recordId}" ><d2l-add-cpd-record>
			`;
		}
		return html`
			<d2l-tabs>
				<d2l-tab-panel
					text="${this.localize('myCPDHeader')}"
					?selected=${(!this.page || this.page === 'my-records')}
					>
					<d2l-my-cpd-records @d2l-navigate-add-cpd="${this.navigateToAddCpd}" @d2l-navigate-edit-cpd="${this.navigateToEditCpd}"></d2l-my-cpd-records>
				</d2l-tab-panel>
				<d2l-tab-panel
					text="${this.localize('pendingRecords')}"
					?selected=${this.page === 'pending-records'}
					>
					<d2l-pending-records></d2l-pending-records>
				</d2l-tab-panel>
				<d2l-tab-panel
					text="${this.localize('pendingRecords')}"
					?selected=${this.page === 'my-team-cpd'}
					>
					<d2l-pending-records></d2l-pending-records>
				</d2l-tab-panel>
			</d2l-tabs>
		`;
	}
}
customElements.define('d2l-cpd', Cpd);
