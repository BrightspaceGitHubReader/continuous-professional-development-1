import '@brightspace-ui/core/components/icons/icon';
import '@brightspace-ui/core/components/colors/colors';
import { css, html, LitElement } from 'lit-element/lit-element';
class ViewToggle extends LitElement {
	static get properties() {
		return {
			text: {
				type: String
			},
			toggleOptions: {
				type: Array
			},
			selectedOption: {
				type: String
			}
		};
	}
	static get styles() {
		return [
			css`
			button.d2l-view-toggle-left,
			:host([dir="rtl"]) button.d2l-view-toggle-right {
				border-top-left-radius: 0.3rem;
				border-bottom-left-radius: 0.3rem;
				border-right-color: transparent;
				border-top-right-radius: 0rem;
				border-bottom-right-radius: 0;
				border-left-color: var(--d2l-color-mica);
			}
			button.d2l-view-toggle-right,
			:host([dir="rtl"]) button.d2l-view-toggle-left {
				border-top-right-radius: 0.3rem;
				border-bottom-right-radius: 0.3rem;
				border-left-color: transparent;
				border-top-left-radius: 0rem;
				border-bottom-left-radius: 0rem;
				border-right-color: var(--d2l-color-mica);
			}
			button {
				background-color: var(--d2l-color-sylvite);
				border-color: var(--d2l-color-mica);
				border-style: solid;
				border-width: 1px;
				box-sizing: border-box;
				color: var(--d2l-color-ferrite);
				cursor: pointer;
				display: inline;
				flex: 1;
				font-family: inherit;
				font-size: .7rem;
				font-weight: 700;
				margin: 0;
				min-height: calc(2rem + 2px);
				outline: none;
				padding: 0.5rem 1.5rem;
				text-align: center;
				transition: box-shadow 0.2s;
				user-select: none;
				vertical-align: middle;
				white-space: nowrap;
				width: auto;
				-webkit-user-select: none;
				-moz-user-select: none;
				-ms-user-select: none;
			}
			button:hover, button:focus {
				border: 1px solid var(--d2l-color-celestine) !important;
			}
			button[selected] {
				background-color: var(--d2l-color-tungsten);
				border-color: var(--d2l-color-tungsten);
				color: var(--d2l-color-regolith);
			}
			button[selected]:hover, button[selected]:focus {
				box-shadow: inset 0 0 0 2px #ffffff;
			}
			:host {
				width: 100%;
				display: flex;
			}
			label {
				display: none;
			}
			@media (min-width: 525px) {
				:host {
					margin: 0 -0.9rem;
					display: block;
					width: auto;
				}
				label {
					margin: 0 0.9rem;
					display: inline;
				}
			}`
		];
	}
	constructor() {
		super();

		if (!this.selectedOption && this.toggleOptions && this.toggleOptions.any()) {
			this.selectedOption = this.toggleOptions[0].val;
		}
	}
	connectedCallback() {
		super.connectedCallback();
	}
	_selectIndex(e) {
		this.selectedOption = e.target.getAttribute('optionVal');
		this.dispatchEvent(
			new CustomEvent(
				'd2l-view-toggle-changed',
				{
					detail: {
						view: this.selectedOption
					},
					composed: true,
					bubbles: true
				}
			)
		);
	}
	render() {
		return html`
		<label>${this.text}</label>
		${this.toggleOptions && this.toggleOptions.map(this._renderButton.bind(this))}
		`;
	}
	_renderButton(option, index) {
		let placement = 'centre';
		if (index === 0) {
			placement = 'left';
		}
		if (this.toggleOptions && index === this.toggleOptions.length - 1) {
			placement = 'right';
		}
		return html`<button
			optionVal="${option.val}"
			@aria-pressed="[[_isPressed(_viewTypes.submissions, currentSelected)]]"
			class="d2l-view-toggle-${placement}"
			@click="${this._selectIndex}"
			?selected="${option.val === this.selectedOption}"
		>${option.text}</button>`;
	}
}
customElements.define('d2l-view-toggle', ViewToggle);
