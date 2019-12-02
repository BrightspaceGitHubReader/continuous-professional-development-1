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

	static createRecord(record, files) {
		const url = window.data.fraSettings.valenceHost;
		const base_path = '/d2l/api/customization/cpd/1.0/record';
		return this.postWithFilesRequest(url, base_path, record, files);
	}

	static getMethods() {
		const url = window.data.fraSettings.valenceHost;
		const base_path = '/d2l/api/customization/cpd/1.0/method';
		return this.getRequest(url, base_path);
	}

	static getQuestions() {
		const url = window.data.fraSettings.valenceHost;
		const base_path = '/d2l/api/customization/cpd/1.0/record/question';
		return this.getRequest(url, base_path);
	}

	static getRecordSummary(page, filters) {
		const url = window.data.fraSettings.valenceHost;
		let base_path = `/d2l/api/customization/cpd/1.0/record?pagenumber=${page}`;

		if (filters) {
			if (filters.Subject.value && filters.Subject.enabled) base_path += `&subject=${filters.Subject.value}`;
			if (filters.Method.value && filters.Method.enabled) base_path += `&method=${filters.Method.value}`;
			if (filters.Name.value) base_path += `&name=${filters.Name.value}`;
		}

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
		return [ {
			Id: 0,
			Name: 'Unstructured'
		},
		{
			Id: 1,
			Name: 'Structured'
		}];
	}

	static postJsonRequest(url, base_path, object) {
		const postRequest = new Request(`${url}${base_path}`, {
			method: 'POST',
			headers: {
				'Content-Type' : 'application/json'
			},
			body: JSON.stringify(object)
		});
		return d2lfetch.fetch(postRequest);
	}

	static postWithFilesRequest(url, base_path, object, files) {
		const data = new FormData();
		data.append('record', JSON.stringify(object));
		for (const file of files) {
			data.append('file', file, file.name);
		}
		const postRequest = new Request(`${url}${base_path}`, {
			method: 'POST',
			body: data
		});
		d2lfetch.fetch(postRequest);
	}

}
