export class CpdRoutes {
	static FullPath(action) { return `${this.Host}/d2l/api/customization/cpd/1.0/${action}`; }
	static get Host() { return window.data.fraSettings.valenceHost; }
	static JobTarget(jobTitle) { return `target/job?jobTitle=${encodeURIComponent(jobTitle)}`; }
	static JobTargetStartDate(jobTitle) { return `target/job/startDate?jobTitle=${encodeURIComponent(jobTitle)}`; }
	static get Method() { return 'method'; }
	static Path(action) { return `/d2l/api/customization/cpd/1.0/${action}`; }
	static get Pending() { return 'pending'; }
	static get Progress() { return 'target/progress'; }
	static get Question() { return 'question'; }
	static get Record() { return 'record'; }
	static get Subject() { return 'subject'; }
	static get Team() { return 'team'; }
	static get UserRecord() {return 'record/user';}
	static get UserTarget() {return 'target/user';}
	static get UserTargetStartDate() {return 'target/user/startDate'; }
}
