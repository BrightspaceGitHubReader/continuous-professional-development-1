import { css, html, LitElement } from 'lit-element/lit-element.js';
import { selectStyles } from '@brightspace-ui/core/components/inputs/input-select-styles.js';

class FilterSelect extends LitElement {

	static get properties() {
		return {
			options: {
				type: Array
			},
			selected: {
				type: Number
			},
			selectedText: {
				type: String
			},
			enabled: {
				type: Boolean
			},
			label: {
				type: String
			}
		};
	}

	static get styles() {
		return [ selectStyles,
			css`
			.select_filter {
				width: 30%;
			}

			.select_filter[enabled=false] {
				pointer-events: none;
				background: #CCC;
				color: #333;
				border: 1px solid #666;
			}

			.select_filter_controls {
				display: flex;
				align-items: baseline;
			}
			`
		];
	}

	constructor() {
		super();

		this.options = [];
		this.selected = 0;
		this.selectedText = '';
		this.enabled = true;
	}

	fireFilterSelectUpdated() {
		const event = new CustomEvent('d2l-filter-select-updated', {
			detail: {
				value: parseInt(this.selected),
				enabled: this.enabled
			}
		});
		this.dispatchEvent(event);
	}

	serializeSelect(option) {
		return html`
		<option 
			value="${option.Id}"
			?selected=${this.selected === option.Id}
			>
			${option.Name}
		</option>
		`;
	}

	filterEnable() {
		this.enabled = !this.enabled;
		this.fireFilterSelectUpdated();
	}

	filterChange(e) {
		this.selected = e.target.value;
		this.selectedText = e.target.text;
		this.fireFilterSelectUpdated();
	}

	render() {
		return html`
			<div id="filter">
				<label id="label">${this.label}</label>
				<div class="select_filter_controls">
				<d2l-input-checkbox 
					 checked 
					 @change="${this.filterEnable}"
					 >
				</d2l-input-checkbox>
					<select
						class="d2l-input-select select_filter"
						enabled="${this.enabled}"
						@change="${this.filterChange}"
						>
						<option value="0">Select a ${this.label}...</option>
						${this.options.map(option => this.serializeSelect(option))}
					</select>
				</div>
			</div>
		`;
	}
}
customElements.define('d2l-filter-select', FilterSelect);
