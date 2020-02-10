import 'd2l-dropdown/d2l-dropdown-context-menu';
import 'd2l-dropdown/d2l-dropdown-content';
import '@brightspace-ui/core/components/menu/menu';
import '@brightspace-ui/core/components/menu/menu-item';
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

	render() {
		return html`
		<div>
			<d2l-button primary>${this.localize('addSubject')}</d2l-button>
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
		`;
	}
}
customElements.define('d2l-cpd-admin-subjects', CpdAdminSubjects);
