const getOptions = {
	headers: new Headers({
		'Access-Control-Allow-Origin': '*'
	}),
	method: 'GET',
	mode: 'cors'
};

export class DemoCpdService {

	static createRecord() {
	}
	static deleteRecord() {}

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
		const data =  {
			structured: {
				numerator: 30,
				denominator: 19
			},
			unstructured: {
				numerator: 12,
				denominator: 15
			}
		};
		return Promise.resolve(data);
	}

	static getQuestions() {
		const data = [{Id:1, QuestionText:'Why is Ben moving?'}];
		return Promise.resolve(data);
	}

	static async getRecord(recordId) {
		const records = await fetch('../../../../data/recordDictionary.json', getOptions).then(r => r.json());
		return Promise.resolve(records[recordId]);
	}

	static getRecordSummary() {
		return fetch('../../../../data/cpd_records.json', getOptions).then(r => r.json());
	}

	static getSubjects() {
		const data = [
			{'Id': 1, 'Name': 'Math'},
			{'Id': 2, 'Name': 'Art'},
			{'Id': 3, 'Name': 'Mortgages'}
		];
		return Promise.resolve(data);
	}
	static getSubjectTargets() {
		return Promise.resolve({
			Objects: [
			]
		});
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

	static getUserInfo() {
		return Promise.resolve('First Last');
	}
}
