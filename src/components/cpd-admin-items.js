import 'd2l-dnd-sortable/d2l-dnd-sortable';
import 'd2l-dropdown/d2l-dropdown-context-menu';
import 'd2l-dropdown/d2l-dropdown-content';
import '@brightspace-ui/core/components/button/button-icon';
import '@brightspace-ui/core/components/dialog/dialog';
import '@brightspace-ui/core/components/dialog/dialog-confirm';
import '@brightspace-ui/core/components/icons/icon';
import { css, html, LitElement } from 'lit-element/lit-element';
import { BaseMixin } from '../mixins/base-mixin';
import { CpdServiceFactory } from '../services/cpd-service-factory';
import { cpdTableStyles } from '../styles/cpd-table-styles';

class CpdAdminItems extends BaseMixin(LitElement) {
	static get properties() {
		return {
			items: {
				type: Array
			},
			context: {
				type: Object
			},
			objectData: {
				type: Object
			},
			sortable: {
				type: Boolean
			},
			showContent: {
				type: Boolean
			}
		};
	}
	static get styles() {
		return [
			cpdTableStyles,
			css`
			li {
				display: grid;
				grid-template-columns: 30px auto;
			}
			d2l-dialog > d2l-input-text {
				margin: 6px 0px;
			}
			`
		];
	}
	constructor() {
		super();
		this.cpdService = CpdServiceFactory.getCpdService();
		this.sortable = true;
		this.showContent = true;
	}
	connectedCallback() {
		super.connectedCallback();
		this.fetchItems();
	}
	delete(e) {
		const itemId = e.target.getAttribute('item-id');
		this.cpdService.Delete(this.context.type)(itemId)
			.then(() => this.fetchItems());
	}
	fetchItems() {
		return this.cpdService.getItems(this.context.type).then(data => this.items = data);
	}
	openEditDialog(e) {
		this.objectData = e.target.getAttribute('item-json') &&
			JSON.parse(e.target.getAttribute('item-json')) || {};
		this.shadowRoot.querySelector(`#create-${this.context.type}-dialog`).open();
	}
	renderRow(item) {
		return html`
		<li item-id="${item.Id}">
			<div>
				<d2l-icon class="drag-handle" icon="d2l-tier1:dragger"></d2l-icon>
			</div>
			<div>
				${item[this.context.textFieldName]}
				<d2l-dropdown-context-menu>
					<d2l-dropdown-content>
						<d2l-menu>
							<d2l-menu-item item-id="${item.Id}" @click="${this.openEditDialog}" text="${this.localize('edit')}" item-json="${JSON.stringify(item)}"></d2l-menu-item>
							${item.InUse ? html`` : html`
							<d2l-menu-item
								item-id="${item.Id}"
								@click="${this.delete}"
								text="${this.localize('delete')}"></d2l-menu-item>`}
						</d2l-menu>
					</d2l-dropdown-content>
				</d2l-dropdown-context-menu>
			</div>
		</li>
		`;
	}
	save() {
		this.objectData[this.context.textFieldName] = this.shadowRoot.querySelector('#objectName').value;

		if (!this.objectData.Id) {
			this.objectData.SortOrder = 0;
			this.cpdService.Create(this.context.type)(this.objectData)
				.then(() => this.fetchItems()
					.then(() => this.objectData = {}));
		} else {
			this.cpdService.Update(this.context.type)(this.objectData.Id)(this.objectData)
				.then(() => this.fetchItems());
		}

	}
	async sorted(e) {
		this.sortable = false;
		const itemId = this.items[e.detail.oldIndex].Id;
		const newSortOrder = e.detail.newIndex + 1;
		this.showContent = false;
		await this.cpdService.updateItemSortOrder(this.context.type, itemId, newSortOrder);
		await this.fetchItems();
		this.sortable = true;
		this.showContent = true;
	}
	renderList() {
		if (!this.showContent) {
			return html``;
		}
		return html`
		<ul @d2l-dnd-sorted="${this.sorted}">
			<d2l-dnd-sortable handle=".drag-handle" ?disabled="${!this.sortable}">
				${this.items && this.items.map(item => this.renderRow(item))}
			</d2l-dnd-sortable>
		</ul>
		`;
	}
	render() {
		return html`
		<div>
			<d2l-button primary @click="${this.openEditDialog}">${this.context.addButtonText}</d2l-button>
		</div>
		${this.renderList()}
		<div>
			<d2l-dialog
				id="create-${this.context.type}-dialog"
				title-text="${this.objectData && this.objectData[this.context.textFieldName] ? this.context.dialogTitleEdit : this.context.dialogTitleAdd}"
				>
				<d2l-input-text
					id="objectName"
					label="${this.context.inputLabel}"
					placeholder="${this.context.placeholderText}"
					value=${this.objectData && this.objectData[this.context.textFieldName] || ''}>
				</d2l-input-text>
				<d2l-button @click="${this.save}" dialog-action primary>${this.localize('save')}</d2l-button>
				<d2l-button dialog-action>${this.localize('cancel')}</d2l-button>
			</d2l-dialog>
		</div>
		`;
	}
}
customElements.define('d2l-cpd-admin-items', CpdAdminItems);
