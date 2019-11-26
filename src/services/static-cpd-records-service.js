const getOptions = {
	headers: new Headers({
		'Access-Control-Allow-Origin': '*'
	}),
	method: 'GET',
	mode: 'cors'
};

export class TestDataService {

	static getMethods() {
		return fetch('../data/methods.json', getOptions).then(r => r.json());
	}

	static getQuestions() {
		return ['Why is Ben moving?'];
	}

	static getRecordSummary() {
		return fetch('../data/cpd_records.json', getOptions).then(r => r.json());
	}

	static getSubjects() {
		return fetch('../data/subjects.json', getOptions).then(r => r.json());
	}

	static getTypes() {
		return ['Structured', 'Unstructured'];
	}
}
