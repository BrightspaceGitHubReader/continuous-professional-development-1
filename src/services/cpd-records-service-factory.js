
import { CpdRecordsService } from '../services/cpd-records-svc';
import { TestDataService } from '../services/static-cpd-records-service';
export class CpdRecordsServiceFactory {
	static getRecordsService() {
		if (window.data && window.data.fraSettings && window.data.fraSettings.valenceHost) {
			return CpdRecordsService;
		}
		return TestDataService;
	}
}
