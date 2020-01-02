export class CpdRoutes {
	static FullPath(action) { return `${this.Host()}/d2l/api/customization/cpd/1.0/${action}`; }
	static get Host() { return window.data.fraSettings.valenceHost; }
	static get JobTarget() { return 'target/job'; }
	static get Method() { return 'method'; }
	static Path(action) { return `/d2l/api/customization/cpd/1.0/${action}`; }
	static get Pending() { return 'pending'; }
	static get Progress() { return 'target/progress'; }
	static get Question() { return 'question'; }
	static get Record() { return 'record'; }
	static get Subject() { return 'subject'; }
	static get Team() { return 'team'; }
	static get UserTarget() {return 'target/user';}
}
