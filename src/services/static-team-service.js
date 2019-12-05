const getOptions = {
	headers: new Headers({
		'Access-Control-Allow-Origin': '*'
	}),
	method: 'GET',
	mode: 'cors'
};

export class StaticTeamService {
	static getMyTeam() {
		return fetch('../../../../data/reports.json', getOptions).then(r => r.json());
	}
}
