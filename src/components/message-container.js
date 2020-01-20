import '@brightspace-ui/core/components/icons/icon';
import { css, html, LitElement } from 'lit-element/lit-element';
import { BaseMixin } from '../mixins/base-mixin';

class MessageContainer extends BaseMixin(LitElement) {

	static get properties() {
		return {
			message: {
				type: String
			}
		};
	}

	static get styles() {
		return css`
		.message_container {
			width: 100%;
			height: 6rem;
			border: 1px solid #cdd5dc;
			border-radius: 0.3rem;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.message_card {
			width: 98%;
			height: 80%;
			background-color: #f9fbff;
			border: 1px solid #cdd5dc;
			border-radius: 0.5rem;
			display: flex;
			align-items: center;
		}

		.message {
			padding: 2rem;
		}
		`;
	}

	constructor() {
		super();
		this.message = '';
	}

	render() {
		return html`
		<div class="message_container">
			<div class="message_card">
				<div class="message">${this.message}</div>
			</div>
		</div>
		`;
	}
}
customElements.define('d2l-message-container', MessageContainer);
