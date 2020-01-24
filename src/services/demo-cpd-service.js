const getOptions = {
	headers: new Headers({
		'Access-Control-Allow-Origin': '*'
	}),
	method: 'GET',
	mode: 'cors'
};

export class DemoCpdService {

	static createRecord() {}

	static deleteRecord() {}

	static getJobTitle() {
		return Promise.resolve('Cool Job');
	}

	static getJobTitleDefaults() {
		return fetch('../../../../data/job_targets.json', getOptions).then(r => r.json());
	}

	static getMethods() {
		const data = [
			{'Id': 1, 'Name': 'Course'},
			{'Id': 2, 'Name': 'Book'},
			{'Id': 3, 'Name': 'Netflix'}
		];
		return Promise.resolve(data);
	}

	static getMyTeam() {
		return fetch('../../../../data/reports.json', getOptions).then(r => r.json());
	}

	static getPendingRecords() {
		return fetch('../../../../data/awards.json', getOptions).then(r => r.json());
	}

	static getProgress() {
		return fetch('../../../../data/target_progress.json', getOptions).then(r => r.json());
	}

	static getQuestions() {
		const data = [
			{Id:1, QuestionText:'Why is Ben moving?'},
			{Id:2, QuestionText:"Why don't Tom's monitors work?"}
		];
		return Promise.resolve(data);
	}

	static async getRecord(recordId) {
		const records = await fetch('../../../../data/recordDictionary.json', getOptions).then(r => r.json());
		return Promise.resolve(records[recordId]);
	}

	static getRecordSummary() {
		return this.getRequest('../../../../data/cpd_records.json');
	}

	static getRequest(url) {
		return fetch(url, getOptions).then(r => r.json());
	}

	static getSubjects() {
		const data = [
			{'Id': 1, 'Name': 'Math'},
			{'Id': 2, 'Name': 'Art'},
			{'Id': 3, 'Name': 'Mortgages'}
		];
		return Promise.resolve(data);
	}

	static getSubjectTargets(jobTitle) {
		if (jobTitle) {
			return fetch('../../../../data/job_title_target.json', getOptions).then(r => r.json());
		}
		return fetch('../../../../data/personal_target.json', getOptions).then(r => r.json());
	}

	static async getTargetRecords() {
		return fetch('../../../../data/record_array.json', getOptions).then(r => r.json());
	}

	static getTypes() {
		return [
			{
				Id: 0,
				Name: 'Unstructured'
			},
			{
				Id: 1,
				Name: 'Structured'
			}
		];
	}

	static getUserInfo() {
		return Promise.resolve('First Last');
	}

	static updateTarget() {
		return Promise.resolve();
	}

	static updateTargetDate(jobTitle, date) {
		alert(`${jobTitle}, ${date}`);
		return Promise.resolve();
	}
}
