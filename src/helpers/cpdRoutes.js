export class CpdRoutes {
	static get Job() { return 'target/job'; }
	static get Method() { return 'method'; }
	static Path(action) { return `/d2l/api/customization/cpd/1.0/${action}`; }
	static get Pending() { return 'pending'; }
	static get Question() { return 'question'; }
	static get Record() { return 'record'; }
	static get Subject() { return 'subject'; }
	static get Target() {return 'target';}
	static get Team() { return 'team'; }
}
