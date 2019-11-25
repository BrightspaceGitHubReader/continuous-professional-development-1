const getOptions = {
	headers: new Headers({
		'Access-Control-Allow-Origin': '*'
	}),
	method: 'GET',
	mode: 'cors'
};

export class TestDataService {

	static getMethods() {
		return fetch('../data/methods.json', getOptions);
	}
	static getQuestions() {
		return ['Why is Ben moving?'];
	}

	static getRecordSummary() {
		return fetch('../data/cpd_records.json', getOptions);
	}

	static getSubjects() {
		return fetch('../data/subjects.json', getOptions);
	}

	static getTypes() {
		return ['Structured', 'Unstructured'];
	}
}
