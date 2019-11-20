export class TestDataService {
	static getRecordSummary() {
		const getOptions = {
			headers: new Headers({
				'Access-Control-Allow-Origin': '*'
			}),
			method: 'GET',
			mode: 'cors'
		};
		return fetch('../data/cpd_records.json', getOptions)
			.then(r => {
				return r.json();
			})
			.catch(() => {
				return {};
			});
	}
}
