export class TestDataService {
	static getRecordSummary(page, pageSize) { //eslint-disable-line
		const getOptions = {
			headers: new Headers({
				'Access-Control-Allow-Origin': '*'
			}),
			method: 'GET',
			mode: 'cors'
		};
		return fetch('../data/cpd_records.json', getOptions);
	}
}
