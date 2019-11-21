import { html, LitElement } from 'lit-element/lit-element.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { selectStyles } from '@brightspace-ui/core/components/inputs/input-select-styles.js';

class PageSelect extends LocalizeMixin(LitElement) {

	static get properties() {
		return {
			pages: {
				type: Number
			},
			pageSizeOptions: {
				type: Array
			},
			currentPage: {
				type: Number
			},
			currentPageSize: {
				type: Number
			}
		};
	}

	static get styles() {
		return selectStyles;
	}

	static async getLocalizeResources(langs) {
		for await (const lang of langs) {
			let translations;
			switch (lang) {
				case 'en':
					translations = await import('../../locales/en.js');
					break;
			}

			if (translations && translations.val) {
				return {
					language: lang,
					resources: translations.val
				};
			}
		}

		return null;
	}

	constructor() {
		super();

		this.pages = 0;
		this.pageSizeOptions = [];
		this.currentPage = 1;
		this.currentPageSize = 25;
	}

	firePageSelectUpdated() {
		const event = new CustomEvent('d2l-page-select-updated', {
			detail: {
				page: this.currentPage,
				pageSize: this.currentPageSize
			}
		});
		this.dispatchEvent(event);
	}

	serializePageOptions(totalPages) {
		const templates = [];
		for (let i = 1; i <= totalPages; i++) {
			templates.push(html`<option value="${i}">${i} of ${totalPages}</option>`);
		}
		return templates;
	}

	setPage(e) {
		this.currentPage = e.target.value;
		this.firePageSelectUpdated();
	}

	setPageSize(e) {
		this.currentPageSize = e.target.value;
		this.firePageSelectUpdated();
	}

	render() {
		return html`
			<select 
				 class="d2l-input-select" 
				 @change="${this.setPage}"
				 >
				${this.serializePageOptions(this.pages)}
			</select>
			<select 
				 class="d2l-input-select" 
				 @change="${this.setPageSize}"
				 >
				${
	this.pageSizeOptions.map(sizeOption =>
		html`<option value=${sizeOption}>${sizeOption} per page</option>`
	)
}
			</select>
		`;
	}
}
customElements.define('d2l-page-select', PageSelect);
