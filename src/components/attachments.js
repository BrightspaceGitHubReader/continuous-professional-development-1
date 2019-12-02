import './attachment-list.js';
import '@brightspace-ui/core/components/button/button.js';
import '@brightspace-ui/core/components/button/button-icon.js';
import '@brightspace-ui/core/components/dialog/dialog.js';
import '@brightspace-ui/core/components/link/link.js';
import '@brightspace-ui/core/components/list/list.js';
import '@brightspace-ui/core/components/list/list-item.js';
import '@brightspace-ui-labs/file-uploader/d2l-file-uploader.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { BaseMixin } from '../mixins/base-mixin.js';

class Attachments extends BaseMixin(LitElement) {

	static get properties() {
		return {
			attachmentsList: {
				type: Array
			},
			currentAttachments: {
				type: Array
			},
			readOnly: {
				type: Boolean,
				value: false
			}
		};
	}

	static get styles() {
		return css`
		`;
	}

	constructor() {
		super();
		this._attachmentsList = [];
		this._currentAttachments = [];
	}

	get attachmentsList() {
		return this._attachmentsList;
	}

	set attachmentsList(val) {
		const oldVal = [...this._attachmentsList];
		this._attachmentsList = val;
		this.requestUpdate('attachmentsList', oldVal).then(() => this.fireAttachmentListUpdated(oldVal));
	}

	get currentAttachments() {
		return this._currentAttachments;
	}

	set currentAttachments(val) {
		const oldVal = [...this._currentAttachments];
		this._currentAttachments = val;
		this.requestUpdate('currentAttachments', oldVal);
	}

	fireAttachmentListUpdated(oldVal) {
		const event = new CustomEvent('d2l-attachments-list-updated', {
			detail: {
				attachmentsList: this.attachmentsList,
				oldVal
			}
		});
		this.dispatchEvent(event);
	}

	onDialogClosed() {
		this.currentAttachments = [];
	}

	commitCurrentFiles() {
		const newFileArray = [...this.attachmentsList];
		newFileArray.push(...this.currentAttachments);
		this.attachmentsList = newFileArray;
	}

	newFilesAdded(evt) {
		const newFileArray = [...this.currentAttachments];
		newFileArray.push(...evt.detail.files);
		this.currentAttachments = newFileArray;
		this.updateComplete.then(() => this.shadowRoot.querySelector('#add_file_dialog').resize());
	}

	updateCurrentEventList(evt) {
		this.requestUpdate('currentAttachments', evt.detail.oldVal);
	}

	updateAttachmentList(evt) {
		this.requestUpdate('attachmentsList', evt.detail.oldVal).then(() => this.fireAttachmentListUpdated(evt.detail.oldVal));
	}

	async showFileDialog() {
		await this.shadowRoot.querySelector('#add_file_dialog').open();
	}

	render() {
		return html`
		<div>
			${this.readOnly ? html`` : html`
				<d2l-button id="add_file_button" @click="${this.showFileDialog}">
						${this.localize('addAFile')}
				</d2l-button>
				`}
				${this.readOnly ? html`
				<d2l-attachment-list 
				.attachmentsList=${this.attachmentsList}
				@internal-attachments-list-removed="${this.updateAttachmentList}"
				readOnly>
			</d2l-attachment-list>` : html`
			<d2l-attachment-list 
				.attachmentsList=${this.attachmentsList}
				@internal-attachments-list-removed="${this.updateAttachmentList}">
			</d2l-attachment-list>`}
			
			<d2l-dialog id="add_file_dialog" title-text="${this.localize('addAFile')}" @d2l-dialog-close="${this.onDialogClosed}">
				<div id="file_loader_wrapper">
					<d2l-labs-file-uploader id="file_loader" multiple @d2l-file-uploader-files-added="${this.newFilesAdded}">
					</d2l-labs-file-uploader>
				</div>				
				<d2l-attachment-list .attachmentsList=${this.currentAttachments} @internal-attachments-list-updated="${this.updateCurrentEventList}">
				</d2l-attachment-list>
				<d2l-button slot="footer" primary dialog-action @click="${this.commitCurrentFiles}">${this.localize('add')}</d2l-button>
				<d2l-button slot="footer" dialog-action>${this.localize('cancel')}</d2l-button>
			</d2l-dialog>
		</div>
		`;
	}
}
customElements.define('d2l-attachments', Attachments);
