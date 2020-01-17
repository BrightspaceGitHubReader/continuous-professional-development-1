import '@brightspace-ui/core/components/button/button-icon';
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
			:host {
				display: grid;
				width: min-content;
				grid-gap: 6px;
				grid-auto-flow: column;
			}
			select {
				width: fit-content;
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
			const pageInfo = {
				numerator: i,
				denominator: totalPages
			};
			templates.push(html`
				<option
					value="${i}"
					?selected=${this.page === i}
					>
					${this.localize('pageCount', pageInfo)}
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
			<d2l-button-icon
				class="${this.page > 1 ? null : 'hide'}"
				icon="tier1:chevron-left"
				@click="${this.decrementPage}"
				aria-label="${this.localize('previousPage')}"
				>
			</d2l-button-icon>
			<select
				id="page-select"
				class="d2l-input-select"
				aria-label="${this.localize('chooseChoice', {choice: this.localize('page')})}"
				@change="${this.setPage}"
				>
				${this.serializePageOptions(this.pages)}
			</select>
			<d2l-button-icon
				class="${this.page < this.pages ? null : 'hide'}"
				icon="tier1:chevron-right"
				@click="${this.incrementPage}"
				aria-label="${this.localize('nextPage')}"
				>
			</d2l-button-icon>
		`;
	}
}
customElements.define('d2l-page-select', PageSelect);
