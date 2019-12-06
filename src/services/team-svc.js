import { d2lfetch } from 'd2l-fetch/src/index';
import fetchAuthFramed from 'd2l-fetch-auth/es6/d2lfetch-auth-framed';

d2lfetch.use({
	name: 'auth',
	fn: fetchAuthFramed,
	options: {
		enableTokenCache: true
	}
});

export class TeamService {
	static getCpdPath(action) { return `/d2l/api/customization/cpd/1.0/${action}`; }

	static getMyTeam(page, filters) {
		let api_path = this.getCpdPath('team');
		api_path += `?pageNumber=${page}`;
		if (filters) {
			const { Name } = filters;
			api_path += `&searchTerm=${Name.value}`;
		}
		return this.getRequest(api_path);
	}

	static getRequest(path) {
		const getRequest = new Request(`${this.Host}${path}`, {
			method: 'GET',
			headers: {
				'Content-Type' : 'application/json'
			}
		});
		return d2lfetch.fetch(getRequest).then(r => r.json());
	}

	static get Host() { return window.data.fraSettings.valenceHost; }

}
