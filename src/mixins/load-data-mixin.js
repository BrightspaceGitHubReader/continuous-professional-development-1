export const LoadDataMixin = superclass => class extends superclass {
	static get properties() {
		return {
			getOptions: {
				type: Object
			},
			cpdRecordsUrl: {
				type: String
			}
		};
	}

	constructor() {
		super();

		this.getOptions = {
			headers: new Headers({
				'Access-Control-Allow-Origin': '*'
			}),
			method: 'GET',
			mode: 'cors'
		};
		this.cpdRecordsUrl = '';
	}

	loadCpdRecords(cpdRecordsUrl) {
		if (!cpdRecordsUrl) {
			return;
		}
		return fetch(cpdRecordsUrl, this.getOptions)
			.then(r => {
				return r.json();
			})
			.catch(() => {
				return {};
			});
	}
};
