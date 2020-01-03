import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin';
import { ResizeObserver } from 'd2l-resize-aware/resize-observer-module.js';

const langTerms = {};
const baseUrl = import.meta.url;

export const BaseMixin = superclass => class extends LocalizeMixin(superclass) {

	static async getLocalizeResources(langs) {
		const uniqueLangs = new Set(langs);

		const getLangUrl = function(lang) {
			const langTermRelativeUrl = `../../locales/${lang}.json`;
			return `${new URL(langTermRelativeUrl, baseUrl)}`;
		};

		for await (const lang of uniqueLangs) {
			if (!lang) {
				continue;
			}

			const langTermUrl = getLangUrl(lang);

			if (langTerms[langTermUrl]) {
				return await langTerms[langTermUrl];
			}

			langTerms[langTermUrl] = (async() => {
				let response = await fetch(langTermUrl);
				if (!response.ok) {
					response = await fetch(getLangUrl('en'));
				}
				const translations = await response.json();
				if (!translations) {
					return;
				}
				return {
					language: lang,
					resources: translations
				};
			})();

			return await langTerms[langTermUrl];
		}

		return null;
	}

	connectedCallback() {
		super.connectedCallback();
		new ResizeObserver(() => {
			this.resize();
		}).observe(document.body, {
			attributes: true
		});
	}

	fireNavigationEvent(pageData) {
		const event = new CustomEvent('d2l-cpd-navigate', {
			bubbles: true,
			composed: true,
			detail: {
				pageData
			}
		});
		this.dispatchEvent(event);
	}

	localize(key, params) {
		return super.localize(key, params) || `{language term '${key}' not found}`;
	}

	resize() {
		window.parentIFrame && window.parentIFrame.size();
	}

};
