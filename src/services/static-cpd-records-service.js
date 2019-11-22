export class TestDataService {

	static getMethods() {
		return ['Course', 'Book', 'Netflix'];
	}
	static getQuestions() {
		return ['Why is Ben moving?'];
	}

	static getRecordSummary() {
		const getOptions = {
			headers: new Headers({
				'Access-Control-Allow-Origin': '*'
			}),
			method: 'GET',
			mode: 'cors'
		};
		return fetch('../data/cpd_records.json', getOptions);
	}

	static getSubjects() {
		return ['Math', 'Art', 'Mortgages'];
	}

	static getTypes() {
		return ['Structured', 'Unstructured'];
	}
}
