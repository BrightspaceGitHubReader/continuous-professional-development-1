export class CpdRoutes {
	static CpdHome() { return '/d2l/custom/cpd/main'; }
	static get CSVReport() { return 'record/report/csv'; }
	static DismissRecord(awardId) { return `pending/dismiss/${awardId}`; }
	static get DisplayName() { return 'team/username'; }
	static FullPath(action) { return `${this.Host}/d2l/api/customization/cpd/1.0/${action}`; }
	static get Host() { return window.data.fraSettings.valenceHost; }
	static ItemId(type, id) { return `${type}/${id}`; }
	static ItemSortOrder(type, id) { return `${type}/${id}/sortorder`; }
	static JobTarget(jobTitle) { return `target/job?jobTitle=${encodeURIComponent(jobTitle)}`; }
	static JobTargetStartDate(jobTitle) { return `target/job/startDate?jobTitle=${encodeURIComponent(jobTitle)}`; }
	static get Method() { return 'method'; }
	static get Pending() { return 'pending'; }
	static get Progress() { return 'target/progress'; }
	static get Question() { return 'question'; }
	static QuestionId(questionId) { return `question/${questionId}`; }
	static get Record() { return 'record'; }
	static RelativePath(action) {return `/d2l/api/customization/cpd/1.0/${action}`;}
	static get Report() { return '/d2l/custom/cpd/report'; }
	static get ReportRecords() { return 'record/report'; }
	static get Subject() { return 'subject'; }
	static get Team() { return 'team'; }
	static UserCSVReport(userId) { return `record/report/csv/user/${userId}`; }
	static UserDisplayName(userId) {return `team/username/user/${userId}`;}
	static UserProgress(userId) {return `${this.Progress}/user/${userId}`;}
	static get UserRecord() { return 'record/user'; }
	static UserReport(userId) { return `/d2l/custom/cpd/report/user/${userId}`; }
	static UserReportRecords(userId) { return `record/report/user/${userId}`; }
	static get UserTarget() { return 'target/user'; }
	static get UserTargetStartDate() { return 'target/user/startDate'; }
	static get WhoAmI() { return '/d2l/api/lp/1.24/users/whoami'; }
}
