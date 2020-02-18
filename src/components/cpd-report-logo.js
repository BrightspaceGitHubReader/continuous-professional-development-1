import { html, LitElement, svg } from 'lit-element/lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';

const baseUrl = import.meta.url;

class CpdReportLogo extends LitElement {
	static get properties() {
		return {
			logoName: {
				type: String
			}
		};
	}
	constructor() {
		super();
		this.logoName = this.logoName || 'sbg-logo';
		this.logoSvg = '';
		const logoPath = `../../logos/${this.logoName}.svg`;
		const logoUrl = `${new URL(logoPath, baseUrl)}`;
		fetch(logoUrl)
			.then(response =>  {
				return response.text();
			})
			.then(logo => {
				this.logoSvg = logo;
				console.log(this.logoSvg);
				console.log(typeof(this.logoSvg));
			});
	}
	svgTemplate() {
		// TODO: This needs to use unsafeSVG instead once that is launched in
		// lit-html 1.2 (currently in release planning stage)
		return svg`
		${ unsafeHTML(this.logoSvg) }
		`;
	}
	render() {
		return html`${this.svgTemplate()}`;
	}
}
customElements.define('d2l-cpd-report-logo', CpdReportLogo);
