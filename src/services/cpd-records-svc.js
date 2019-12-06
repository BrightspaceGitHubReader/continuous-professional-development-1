import { d2lfetch } from 'd2l-fetch/src/index';
import { dateParamString } from '../helpers/time-helper.js';
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
		return this.postWithFilesRequest(this.getCpdPath(this.Record), record, files);
	}

	static deleteRecord(recordId) {
		const request = new Request(`${this.Host}${this.getCpdPath(this.Record)}/${recordId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type' : 'application/json'
			}
		});
		return d2lfetch.fetch(request);
	}

	static getCpdPath(action) { return `/d2l/api/customization/cpd/1.0/${action}`; }

	static getMethods() {
		return this.getRequest(this.getCpdPath(this.Method));
	}

	static getQuestions() {
		return this.getRequest(this.getCpdPath(this.Question));
	}

	static getRecord(recordId) {
		const base_path = `${this.getCpdPath(this.Record)}/${recordId}`;
		return this.getRequest(base_path);
	}

	static getRecordSummary(page, viewUserId, filters) {
		let base_path = `${this.getCpdPath(this.Record)}?pageNumber=${page}`;

		if (filters) {
			const { Subject, Method, Name, StartDate, EndDate } = filters;
			if (Subject.value && Subject.enabled) base_path += `&subject=${Subject.value}`;
			if (Method.value && Method.enabled) base_path += `&method=${Method.value}`;
			if (Name.value) base_path += `&name=${Name.value}`;
			if (StartDate.value) base_path += `&startdate=${dateParamString(StartDate.value)}`;
			if (EndDate.value) base_path += `&enddate=${dateParamString(EndDate.value, true)}`;
		}

		if (viewUserId) {
			base_path += `&userId=${viewUserId}`;
		}

		return this.getRequest(base_path);
	}

	static getRequest(base_path) {
		const getRequest = new Request(`${this.Host}${base_path}`, {
			method: 'GET',
			headers: {
				'Content-Type' : 'application/json'
			}
		});
		return d2lfetch.fetch(getRequest).then(r => r.json());
	}

	static getSubjects() {
		const base_path = '/d2l/api/customization/cpd/1.0/subject';
		return this.getRequest(base_path);
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

	static get Host() { return window.data.fraSettings.valenceHost; }

	static get Method() { return 'method'; }

	static postJsonRequest(base_path, object) {
		const postRequest = new Request(`${base_path}`, {
			method: 'POST',
			headers: {
				'Content-Type' : 'application/json'
			},
			body: JSON.stringify(object)
		});
		return d2lfetch.fetch(postRequest);
	}

	static postWithFilesRequest(base_path, object, files) {
		const data = new FormData();
		data.append('record', JSON.stringify(object));
		for (const file of files) {
			data.append('file', file, file.name);
		}
		const postRequest = new Request(`${this.Host}${base_path}`, {
			method: 'POST',
			body: data
		});
		return d2lfetch.fetch(postRequest);
	}

	static putWithFilesRequest(base_path, object, files, removedFiles) {
		const data = new FormData();
		data.append('record', JSON.stringify(object));
		data.append('deletedFiles', JSON.stringify(removedFiles));
		for (const file of files) {
			data.append('file', file, file.name);
		}
		const postRequest = new Request(`${this.Host}${base_path}`, {
			method: 'PUT',
			body: data
		});
		return d2lfetch.fetch(postRequest);
	}

	static get Question() { return 'question'; }

	static get Record() { return 'record'; }

	static get Subject() { return 'subject'; }

	static updateRecord(recordId, record, files, removedFiles) {
		return this.putWithFilesRequest(`${this.getCpdPath(this.Record)}/${recordId}`, record, files, removedFiles);
	}

}
