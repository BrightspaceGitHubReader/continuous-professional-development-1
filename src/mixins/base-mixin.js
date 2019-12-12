import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin';
import { ResizeObserver } from 'd2l-resize-aware/resize-observer-module.js';

const langTerms = {};
const baseUrl = import.meta.url;

export const BaseMixin = superclass => class extends LocalizeMixin(superclass) {

	static async getLocalizeResources(langs) {
		const uniqueLangs = new Set(langs);

		for await (let lang of uniqueLangs) {
			if (!lang) {
				continue;
			}

			lang = lang.replace(/-(?!tw)\w+/, '');

			const langTermRelativeUrl = `../../locales/${lang}.json`;
			const langTermUrl = `${new URL(langTermRelativeUrl, baseUrl)}`;

			if (langTerms[langTermUrl]) {
				return await langTerms[langTermUrl];
			}

			langTerms[langTermUrl] = (async() => {
				const response = await fetch(langTermUrl);
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

	fireNavigationEvent(page, recordId, viewUserId, awardId) {
		const event = new CustomEvent('d2l-navigate', {
			detail: {
				page,
				recordId,
				viewUserId,
				awardId
			}
		});
		return this.dispatchEvent(event);
	}

	localize(key, params) {
		return super.localize(key, params) || `{language term '${key}' not found}`;
	}

	resize() {
		window.parentIFrame && window.parentIFrame.size();
	}

};
