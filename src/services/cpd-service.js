import { CpdRoutes } from '../helpers/cpdRoutes';
import { d2lfetch } from 'd2l-fetch/src/index';
import { dateParamString } from '../helpers/time-helper';
import fetchAuthFramed from 'd2l-fetch-auth/es6/d2lfetch-auth-framed';

d2lfetch.use({
	name: 'auth',
	fn: fetchAuthFramed,
	options: {
		enableTokenCache: true
	}
});

export class CpdService {

	static CpdPath(action) { return `/d2l/api/customization/cpd/1.0/${action}`; }

	static get Create() {
		return (type) => {
			return (object) => {
				return this.postJsonRequest(this.CpdPath(type), object);
			};
		};
	}
	static createMethod(method) {
		return this.postJsonRequest(this.CpdPath(CpdRoutes.Method), method);
	}
	static createQuestion(question) {
		return this.Create('question')(question);
	}
	static createRecord(record, files) {
		return this.postWithFilesRequest(this.CpdPath(CpdRoutes.Record), record, files);
	}
	static createSubject(subject) {
		return this.postJsonRequest(this.CpdPath(CpdRoutes.Subject), subject);
	}
	static get Delete() {
		return (type) => {
			return (id) => {
				const request = new Request(`${this.Host}${this.CpdPath(type)}/${id}`, {
					method: 'DELETE',
					headers: {
						'Content-Type' : 'application/json'
					}
				});
				return d2lfetch.fetch(request);
			};
		};
	}
	static deleteMethod(methodId) {
		const request = new Request(`${this.Host}${this.CpdPath(CpdRoutes.Method)}/${methodId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type' : 'application/json'
			}
		});
		return d2lfetch.fetch(request);
	}
	static deleteQuestion(questionId) {
		const request = new Request(`${this.Host}${this.CpdPath(CpdRoutes.Question)}/${questionId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type' : 'application/json'
			}
		});
		return d2lfetch.fetch(request);
	}
	static deleteRecord(recordId) {
		const request = new Request(`${this.Host}${this.CpdPath(CpdRoutes.Record)}/${recordId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type' : 'application/json'
			}
		});
		return d2lfetch.fetch(request);
	}
	static getJobTitleDefaults(page) {
		let api_path = this.CpdPath(this.JobTitle);
		api_path += `?pageNumber=${page}`;
		return this.getRequest(api_path);
	}

	static getMethods() {
		return this.getRequest(this.CpdPath(this.Method));
	}
	static getMyTeam(page, filters) {
		let api_path = this.CpdPath(this.Team);
		api_path += `?pageNumber=${page}`;
		if (filters) {
			const { Name } = filters;
			if (Name && Name.value) api_path += `&searchTerm=${encodeURIComponent(Name.value)}`;
		}
		return this.getRequest(api_path);
	}

	static getPendingRecords(page, filters) {
		let api_path = this.CpdPath(this.Pending);
		api_path += `?pageNumber=${page}`;
		if (filters) {
			const { Name, StartDate, EndDate } = filters;
			if (Name && Name.value) api_path += `&awardName=${encodeURIComponent(Name.value)}`;
			if (StartDate && StartDate.value) api_path += `&startDate=${dateParamString(StartDate.value)}`;
			if (EndDate && EndDate.value) api_path += `&endDate=${dateParamString(EndDate.value, true)}`;
		}
		return this.getRequest(api_path);
	}

	static getProgress() {
		return this.getRequest(CpdRoutes.Path(CpdRoutes.Progress));
	}

	static getQuestions() {
		return this.getRequest(this.CpdPath(CpdRoutes.Question));
	}
	static getRecord(recordId) {
		const base_path = `${this.CpdPath(this.Record)}/${recordId}`;
		return this.getRequest(base_path)
			.then(body => {
				if (body.Attachments) {
					body.Attachments.Files = body.Attachments.Files.map(file => {
						return {
							id: file.Id,
							name: file.Name,
							size: file.Size,
							href: `${file.Href}`
						};
					});
				}
				return body;
			});
	}
	static getRecordSummary(page, viewUserId, filters) {
		let base_path = `${this.CpdPath(this.Record)}?pageNumber=${page}`;
		if (viewUserId) {
			base_path = CpdRoutes.Path(`${CpdRoutes.UserRecord}/${viewUserId}?pageNumber=${page}`);
		}

		if (filters) {
			const { Subject, Method, Name, StartDate, EndDate } = filters;
			if (Subject.value && Subject.enabled) base_path += `&subject=${Subject.value}`;
			if (Method.value && Method.enabled) base_path += `&method=${Method.value}`;
			if (Name.value) base_path += `&name=${encodeURIComponent(Name.value)}`;
			if (StartDate.value) base_path += `&startDate=${dateParamString(StartDate.value)}`;
			if (EndDate.value) base_path += `&endDate=${dateParamString(EndDate.value, true)}`;
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
	static getSubjectTargets(jobTitle) {
		if (!jobTitle) {
			return this.getRequest(CpdRoutes.Path(CpdRoutes.UserTarget));
		}
		return this.getRequest(CpdRoutes.Path(CpdRoutes.JobTarget(jobTitle)));
	}
	static getTargetRecords(userId) {
		if (!userId) {
			return this.getRequest(CpdRoutes.Path(CpdRoutes.ReportRecords));
		}
		return this.getRequest(CpdRoutes.Path(CpdRoutes.UserReportRecords(userId)));
	}
	static getTypes() {
		return [ {
			Id: 1,
			Name: 'Structured'
		},
		{
			Id: 0,
			Name: 'Unstructured'
		}];
	}
	static getUserInfo(userId) {
		if (!userId) {
			return this.getRequest(CpdRoutes.Path(CpdRoutes.DisplayName));
		}
		return this.getRequest(CpdRoutes.Path(CpdRoutes.UserDisplayName(userId)));
	}
	static getWhoAmI() {
		return this.getRequest(CpdRoutes.WhoAmI);
	}
	static get Host() { return window.data.fraSettings.valenceHost; }
	static get Job() { return 'target/job'; }
	static get JobTitle() { return 'target/jobtitles'; }
	static get Method() { return 'method'; }
	static ParentHost(route) {
		return window.data.fraSettings.navigation.getLastD2LPage()
			.then(page => {
				const host = (new URL(page.url)).host;
				return `http://${host}${route ? route : ''}`;
			});
	}
	static get Pending() { return 'pending'; }
	static postJsonRequest(base_path, object) {
		const postRequest = new Request(`${this.Host}${base_path}`, {
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

	static get Question() {
		return {
			delete: this.deleteQuestion,
			update: this.updateQuestion,
			create: this.createQuestion
		};
	}
	static get Record() { return 'record'; }
	static get Subject() { return 'subject'; }
	static get Target() {return 'target';}
	static get Team() { return 'team'; }
	static get Update() {
		return (type) => {
			return (object) => {
				return this.postJsonRequest(this.CpdPath(type), object);
			};
		};
	}
	static updateRecord(recordId, record, files, removedFiles) {
		return this.putWithFilesRequest(`${this.CpdPath(this.Record)}/${recordId}`, record, files, removedFiles);
	}

	static updateSubject(subjectId, subject) {
		return this.postJsonRequest(`${this.CpdPath(this.Subject)}/${subjectId}}`, subject);
	}

	static updateTarget(jobTitle, target) {
		if (jobTitle) {
			return this.postJsonRequest(CpdRoutes.FullPath(CpdRoutes.JobTarget(jobTitle)), target);
		} else {
			return this.postJsonRequest(CpdRoutes.FullPath(CpdRoutes.UserTarget), target);
		}
	}

	static updateTargetDate(date, jobTitle) {
		return this.postJsonRequest(jobTitle ? CpdRoutes.FullPath(CpdRoutes.JobTargetStartDate(jobTitle)) : CpdRoutes.FullPath(CpdRoutes.UserTargetStartDate), date);
	}
}
