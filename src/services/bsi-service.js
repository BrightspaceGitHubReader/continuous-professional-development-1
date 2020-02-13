import { CpdService } from './cpd-service';

export class BsiService extends CpdService {
	static get GetOptions() {
		return {
			credentials: 'include',
			headers: new Headers({
				'Access-Control-Allow-Origin': '*',
			}),
			method: 'GET',
			mode: 'cors'
		};
	}

	static getRequest(url) {
		return fetch(url, this.GetOptions).then(r => r.json());
	}
}
