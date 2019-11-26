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
		const getMethodsRequest = new Request(`${url}${base_path}`, {
			method: 'GET',
			headers: {
				'Content-Type' : 'application/json'
			}
		});

		return d2lfetch.fetch(getMethodsRequest).then(r => r.json());
	}

	static getRecordSummary(page) {
		const url = window.data.fraSettings.valenceHost;
		const base_path = `/d2l/api/customization/cpd/1.0/record?pagenumber=${page}`;
		const getRecordSummaryRequest = new Request(`${url}${base_path}`, {
			method: 'GET',
			headers: {
				'Content-Type' : 'application/json'
			}
		});

		return d2lfetch.fetch(getRecordSummaryRequest).then(r => r.json());
	}

	static getSubjects() {
		const url = window.data.fraSettings.valenceHost;
		const base_path = '/d2l/api/customization/cpd/1.0/subject';
		const getSubjectsRequest = new Request(`${url}${base_path}`, {
			method: 'GET',
			headers: {
				'Content-Type' : 'application/json'
			}
		});

		return d2lfetch.fetch(getSubjectsRequest).then(r => r.json());
	}

	static getTypes() {
		const url = window.data.fraSettings.valenceHost;
		const base_path = '';
		const getTypesRequest = new Request(`${url}${base_path}`, {
			method: 'GET',
			headers: {
				'Content-Type' : 'application/json'
			}
		});

		return d2lfetch.fetch(getTypesRequest).then(r => r.json());
	}
}
