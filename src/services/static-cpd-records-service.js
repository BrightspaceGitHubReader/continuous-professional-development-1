export class TestDataService {
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

	static getRecordSummaryPage(page, pageSize) { //eslint-disable-line
		return this.getRecordSummary();
	}
}
