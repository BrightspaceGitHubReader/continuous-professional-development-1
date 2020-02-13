import { BsiService } from '../services/bsi-service';
import { CpdService } from '../services/cpd-service';
import { DemoCpdService } from '../services/demo-cpd-service';

export class CpdServiceFactory {
	static getCpdService() {
		if (window.data && window.data.fraSettings && window.data.fraSettings.valenceHost) {
			return CpdService;
		} else if (window.demo) {
			return DemoCpdService;
		}
		return BsiService;
	}
}
