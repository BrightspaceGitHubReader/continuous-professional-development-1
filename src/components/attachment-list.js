import '@brightspace-ui/core/components/button/button.js';
import '@brightspace-ui/core/components/button/button-icon.js';
import '@brightspace-ui/core/components/dialog/dialog.js';
import '@brightspace-ui/core/components/link/link.js';
import '@brightspace-ui/core/components/list/list.js';
import '@brightspace-ui/core/components/list/list-item.js';
import '@brightspace-ui-labs/file-uploader/d2l-file-uploader.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { BaseMixin } from '../mixins/base-mixin.js';

class AttachmentList extends BaseMixin(LitElement) {

	static get properties() {
		return {
			attachmentsList: {
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
	}

	get attachmentsList() {
		return this._attachmentsList;
	}

	set attachmentsList(val) {
		const oldVal = this._attachmentsList;
		this._attachmentsList = val;
		this.requestUpdate('attachmentsList', oldVal).then(() => this.fireAttachmentListUpdated(oldVal));
	}

	fireAttachmentListUpdated(oldVal) {
		const event = new CustomEvent('internal-attachments-list-updated', {
			detail: {
				attachmentsList: this.attachmentsList,
				oldVal
			}
		});
		this.dispatchEvent(event);
	}

	fireAttachmentListRemoved(removedItem) {
		const event = new CustomEvent('internal-attachments-list-removed', {
			detail: {
				attachmentsList: this.attachmentsList,
				removedItem: removedItem
			}
		});
		this.dispatchEvent(event);
	}

	getFileSizeString(fileSize) {
		if (fileSize === 0) {
			return '(0 Bytes)';
		}

		const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
		const decimals = 2;
		const k = 1024;
		const denomination = Math.floor(Math.log(fileSize) / Math.log(k));
		return `(${parseFloat((fileSize / Math.pow(k, denomination)).toFixed(decimals))} ${sizes[denomination]})`;
	}

	removeFile(evt) {
		const oldVal = [...this.attachmentsList];
		const removedValue = this.attachmentsList[evt.target.attributes.index.value];
		this.attachmentsList.splice(evt.target.attributes.index.value, 1);
		this.requestUpdate('attachmentsList', oldVal).then(() => {
			this.fireAttachmentListUpdated(oldVal);
			this.fireAttachmentListRemoved(removedValue);
		});
	}

	render() {
		return html`
			<d2l-list separators="none">
				${this.attachmentsList && this.attachmentsList.map((attachment, index) => html`
					<d2l-list-item>
						<d2l-link href="${window.URL.createObjectURL(attachment)}" target="_blank">
							${attachment.name}
						</d2l-link>
						<span>${this.getFileSizeString(attachment.size)}</span>
						${this.readOnly ? html`` : html`
						<d2l-button-icon index="${index}" icon="tier1:close-small" @click="${this.removeFile}"></d2l-button-icon>
						`}
					</d2l-list-item>
				`)}
			</d2l-list>
		`;
	}
}
customElements.define('d2l-attachment-list', AttachmentList);
