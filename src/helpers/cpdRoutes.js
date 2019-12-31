export class CpdRoutes {
	static get JobTarget() { return 'target/job'; }
	static get Method() { return 'method'; }
	static Path(action) { return `${window.data.fraSettings.valenceHost}/d2l/api/customization/cpd/1.0/${action}`; }
	static get Pending() { return 'pending'; }
	static get Question() { return 'question'; }
	static get Record() { return 'record'; }
	static get Subject() { return 'subject'; }
	static get Team() { return 'team'; }
	static get UserTarget() {return 'target/user';}
}
