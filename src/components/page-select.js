import '@brightspace-ui/core/components/icons/icon.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { BaseMixin } from '../mixins/base-mixin.js';
import { selectStyles } from '@brightspace-ui/core/components/inputs/input-select-styles.js';

class PageSelect extends BaseMixin(LitElement) {

	static get properties() {
		return {
			pages: {
				type: Number
			},
			page: {
				type: Number
			}
		};
	}

	static get styles() {
		return [
			selectStyles,
			css`
			.hide {
				visibility: hidden;
			}
			`
		];
	}

	constructor() {
		super();

		this.pages = 0;
		this.page = 1;
	}

	firePageSelectUpdated() {
		const event = new CustomEvent('d2l-page-select-updated', {
			detail: {
				page: this.page
			}
		});
		this.dispatchEvent(event);
	}

	serializePageOptions(totalPages) {
		const templates = [];
		for (let i = 1; i <= totalPages; i++) {
			templates.push(html`
				<option 
					value="${i}"
					?selected=${this.page === i}
					>
					${i} ${this.localize('of')} ${totalPages}
				</option>
			`);
		}
		return templates;
	}

	setPage(e) {
		this.page = e.target.value;
		this.firePageSelectUpdated();
	}

	incrementPage() {
		this.page++;
		const select = this.shadowRoot.querySelector('#page-select');
		select.options[++select.selectedIndex].selected = true;
		this.firePageSelectUpdated();
	}

	decrementPage() {
		this.page--;
		const select = this.shadowRoot.querySelector('#page-select');
		select.options[--select.selectedIndex].selected = true;
		this.firePageSelectUpdated();
	}

	render() {
		return html`
			<d2l-icon 
				class="${this.page > 1 ? null : 'hide'}"
				icon="tier1:chevron-left" 
				@click="${this.decrementPage}"
				>
			</d2l-icon>
			<select 
				id="page-select"
				class="d2l-input-select" 
				@change="${this.setPage}"
				>
				${this.serializePageOptions(this.pages)}
			</select>
			<d2l-icon 
				class="${this.page < this.pages ? null : 'hide'}"
				icon="tier1:chevron-right" 
				@click="${this.incrementPage}"
				>
			</d2l-icon>
		`;
	}
}
customElements.define('d2l-page-select', PageSelect);
