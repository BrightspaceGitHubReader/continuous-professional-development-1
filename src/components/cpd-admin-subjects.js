import 'd2l-dnd-sortable/d2l-dnd-sortable';
import 'd2l-dropdown/d2l-dropdown-context-menu';
import 'd2l-dropdown/d2l-dropdown-content';
import '@brightspace-ui/core/components/dialog/dialog';
import '@brightspace-ui/core/components/dialog/dialog-confirm';
import { css, html, LitElement } from 'lit-element/lit-element';
import { BaseMixin } from '../mixins/base-mixin';
import { CpdServiceFactory } from '../services/cpd-service-factory';
import { cpdTableStyles } from '../styles/cpd-table-styles';

class CpdAdminSubjects extends BaseMixin(LitElement) {
	static get properties() {
		return {
			subjects: {
				type: Array
			}
		};
	}
	static get styles() {
		return [
			cpdTableStyles,
			css`
			td > span {
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
			`
		];
	}
	constructor() {
		super();
		this.cpdService = CpdServiceFactory.getCpdService();
	}
	addSubject() {
		this.shadowRoot.querySelector('#create-subject-dialog').open();
	}
	connectedCallback() {
		super.connectedCallback();
		this.fetchSubjects();
	}
	deleteSubject(e) {
		const subjectId = e.target.getAttribute('subject-id');
		const dropdownContent = this.shadowRoot.querySelector(`#subjectDropdown-${subjectId}`);
		this.cpdService.deleteSubject(subjectId);
		this.fetchSubjects();
		dropdownContent.removeAttribute('opened');
	}
	editSubject(e) {
		const subjectId = e.target.getAttribute('subject-id');
		const dropdownContent = this.shadowRoot.querySelector(`#subjectDropdown-${subjectId}`);
		dropdownContent.removeAttribute('opened');
	}
	fetchSubjects() {
		this.cpdService.getSubjects().then(data => this.subjects = data);
	}
	openEditDialog() {
		this.shadowRoot.querySelector('#create-subject-dialog').open();
	}
	renderRow(subject) {
		return html`
		<tr>
			<td>
				<span>
				${subject.Name}
				<d2l-dropdown-context-menu text="${this.localize('editSubject', {subjectName: subject.Name})}">
					<d2l-dropdown-content id="subjectDropdown-${subject.Id}">
					<d2l-dropdown-menu>
						<d2l-menu>
							<d2l-menu-item subject-id="${subject.Id}" @click="${this.editSubject}" text="${this.localize('editSubject')}"></d2l-menu-item>
							<d2l-menu-item subject-id="${subject.Id}" @click="${this.deleteSubject}" text="${this.localize('delete')}"></d2l-menu-item>
						</d2l-menu>
					</d2l-dropdown-menu>
					</d2l-dropdown-content>
				</d2l-dropdown-context-menu>
				</span>
			</td>
			<td>${subject.SortOrder}</td>
			<td><d2l-icon icon="tier1:check"></d2l-icon></td>
		</tr>
		`;
	}
	save() {
		const subject = {
			Name: this.shadowRoot.querySelector('#objectName').value,
			SortOrder: 0
		};
		this.cpdService.createSubject(subject).then(() => this.fetchSubjects());
	}
	render() {
		return html`
		<div>
			<d2l-button primary @click="${this.addSubject}">${this.localize('addSubject')}</d2l-button>
		</div>

		<table>
			<thead>
				<tr>
					<th>${this.localize('label')}</th>
					<th>${this.localize('sortOrder')}</th>
					<th>${this.localize('inUse')}</th>
				</tr>
			</thead>
			${this.subjects && this.subjects.map(subject => this.renderRow(subject))}
		</table>
		<div>
			<d2l-dialog id="create-subject-dialog" title-text="${this.localize('subjectTargets')}">
				<d2l-input-text
					id="objectName"
					label="${this.localize('subjectName')}"
					placeholder="${this.localize('subjectNamePlaceholder')}"
					value=${this.objectData && this.objectData.Name || ''}>
				</d2l-input-text>
				<d2l-button @click="${this.save}" dialog-action primary>${this.localize('save')}</d2l-button>
				<d2l-button dialog-action>${this.localize('cancel')}</d2l-button>
			</d2l-dialog>
		</div>
		`;
	}
}
customElements.define('d2l-cpd-admin-subjects', CpdAdminSubjects);
