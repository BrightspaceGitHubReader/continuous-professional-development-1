import { d2lfetch } from 'd2l-fetch/src/index';
import fetchAuthFramed from 'd2l-fetch-auth/es6/d2lfetch-auth-framed';

d2lfetch.use({
	name: 'auth',
	fn: fetchAuthFramed,
	options: {
		enableTokenCache: true
	}
});

export class CpdRecordsService {
	static getMethods() {
		const url = window.data.fraSettings.valenceHost;
		const base_path = '/d2l/api/customization/cpd/1.0/method';
		return this.getRequest(url, base_path);
	}

	static getRecordSummary(page) {
		const url = window.data.fraSettings.valenceHost;
		const base_path = `/d2l/api/customization/cpd/1.0/record?pagenumber=${page}`;
		return this.getRequest(url, base_path);
	}

	static getRequest(url, base_path) {
		const getRequest = new Request(`${url}${base_path}`, {
			method: 'GET',
			headers: {
				'Content-Type' : 'application/json'
			}
		});

		return d2lfetch.fetch(getRequest).then(r => r.json());
	}

	static getSubjects() {
		const url = window.data.fraSettings.valenceHost;
		const base_path = '/d2l/api/customization/cpd/1.0/subject';
		return this.getRequest(url, base_path);
	}

	static getTypes() {
		const url = window.data.fraSettings.valenceHost;
		const base_path = '';
		return this.getRequest(url, base_path);
	}
}
