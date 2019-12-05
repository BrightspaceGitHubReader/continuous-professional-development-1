import { CpdRecordsService } from '../services/cpd-records-svc';
import { StaticCpdRecordsService } from '../services/static-cpd-records-service';
import { StaticTeamService } from '../services/static-team-service';
import { TeamService } from '../services/team-service';

export class ServiceFactory {
	static getRecordsService() {
		if (window.data && window.data.fraSettings && window.data.fraSettings.valenceHost) {
			return CpdRecordsService;
		}
		return StaticCpdRecordsService;
	}

	static getTeamService() {
		if (window.data && window.data.fraSettings && window.data.fraSettings.valenceHost) {
			return TeamService;
		}
		return StaticTeamService;
	}
}
