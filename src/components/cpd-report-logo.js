import { LitElement } from 'lit-element/lit-element';

class CpdReportLogo extends LitElement {
	static get properties() {
		return {
			logoName: {
				type: String
			},
			logoSvg: {
				type: String
			}
		};
	}
	constructor() {
		super();
		this.logoName = this.logoName || 'sbg-logo';
		const logoPath = `../logos/${this.logoName}.js`;
		import(logoPath).then(logoModule => {
			this.logoSvg = logoModule.default;
		});
	}
	render() {
		return this.logoSvg;
	}
}
customElements.define('d2l-cpd-report-logo', CpdReportLogo);
