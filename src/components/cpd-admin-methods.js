import 'd2l-dnd-sortable/d2l-dnd-sortable';
import '@brightspace-ui/core/components/button/button-icon';
import '@brightspace-ui/core/components/dialog/dialog';
import '@brightspace-ui/core/components/dialog/dialog-confirm';
import '@brightspace-ui/core/components/icons/icon';
import { css, html, LitElement } from 'lit-element/lit-element';
import { BaseMixin } from '../mixins/base-mixin';
import { CpdServiceFactory } from '../services/cpd-service-factory';
import { cpdTableStyles } from '../styles/cpd-table-styles';

class CpdAdminMethods extends BaseMixin(LitElement) {
	static get properties() {
		return {
			methods: {
				type: Array
			},
			objectData: {
				type: Object
			}
		};
	}
	static get styles() {
		return [
			cpdTableStyles,
			css`
			li {
				display: grid;
				grid-template-columns: 30px auto 42px 42px
			}
			`
		];
	}
	constructor() {
		super();
		this.cpdService = CpdServiceFactory.getCpdService();
	}
	connectedCallback() {
		super.connectedCallback();
		this.fetchMethods();
	}
	delete(e) {
		const methodId = e.target.getAttribute('item-id');
		this.cpdService.deleteMethod(methodId)
			.then(() => this.fetchMethods());
	}
	fetchMethods() {
		this.cpdService.getMethods().then(data => this.methods = data);
	}
	openEditDialog(e) {
		const item = e.target.getAttribute('item-json') &&
			JSON.parse(e.target.getAttribute('item-json')) || {};
		this.objectData = item;
		this.shadowRoot.querySelector('#create-method-dialog').open();
	}
	renderRow(item) {
		return html`
		<li>
			<div>
				<d2l-icon class="drag-handle" icon="d2l-tier1:dragger"></d2l-icon>
			</div>
			<div>
				<div>${item.Name}</div>
			</div>
			<div>
				<d2l-button-icon item-id="${item.Id}" icon="d2l-tier1:edit" item-json="${JSON.stringify(item)}" @click="${this.openEditDialog}"></d2l-button-icon>
			</div>
			<div>
				<d2l-button-icon item-id="${item.Id}" icon="d2l-tier1:delete" @click="${this.delete}"></d2l-button-icon>
			</div>
		</li>
		`;
	}
	save() {
		const method = {
			Name: this.shadowRoot.querySelector('#objectName').value,
			SortOrder: 0
		};
		this.cpdService.createMethod(method).then(() => this.fetchMethods());
	}
	render() {

		return html`
		<div>
			<d2l-button primary @click="${this.openEditDialog}">${this.localize('addMethod')}</d2l-button>
		</div>
		<ul>
			<d2l-dnd-sortable
			handle=".drag-handle"
			>
			${this.methods && this.methods.map(method => this.renderRow(method))}

		</ul>
		</d2l-dnd-sortable>

		<div>
			<d2l-dialog id="create-method-dialog" title-text="${this.localize('editMethod')}">
				<d2l-input-text
					id="objectName"
					label="${this.localize('methodName')}"
					placeholder="${this.localize('methodNamePlaceholder')}"
					value=${this.objectData && this.objectData.Name || ''}>
				</d2l-input-text>
				<d2l-button @click="${this.save}" dialog-action primary>${this.localize('save')}</d2l-button>
				<d2l-button dialog-action>${this.localize('cancel')}</d2l-button>
			</d2l-dialog>
		</div>
		`;
	}
}
customElements.define('d2l-cpd-admin-methods', CpdAdminMethods);
