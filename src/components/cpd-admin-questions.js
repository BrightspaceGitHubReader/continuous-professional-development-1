import 'd2l-dnd-sortable/d2l-dnd-sortable';
import 'd2l-dropdown/d2l-dropdown-context-menu';
import 'd2l-dropdown/d2l-dropdown-content';
import '@brightspace-ui/core/components/button/button-icon';
import '@brightspace-ui/core/components/dialog/dialog';
import '@brightspace-ui/core/components/dialog/dialog-confirm';
import '@brightspace-ui/core/components/icons/icon';
import { css, html, LitElement } from 'lit-element/lit-element';
import { BaseMixin } from '../mixins/base-mixin';
import { CpdServiceFactory } from '../services/cpd-service-factory';
import { cpdTableStyles } from '../styles/cpd-table-styles';

class CpdAdminQuestions extends BaseMixin(LitElement) {
	static get properties() {
		return {
			questions: {
				type: Array
			},
			sortable: {
				type: Boolean
			},
			objectData: {
				type: Object
			},
			showContent: {
				type: Boolean
			}
		};
	}
	static get styles() {
		return [
			cpdTableStyles,
			css`
			li {
				display: grid;
				grid-template-columns: 30px auto;
			}
			`
		];
	}
	constructor() {
		super();
		this.cpdService = CpdServiceFactory.getCpdService();
		this.sortable = true;
		this.showContent = true;
	}
	connectedCallback() {
		super.connectedCallback();
		this.fetchQuestions();
	}
	delete(e) {
		const questionId = e.target.getAttribute('item-id');
		this.cpdService.deleteQuestion(questionId)
			.then(() => this.fetchQuestions());
	}
	fetchQuestions() {
		return this.cpdService.getQuestions().then(data => this.questions = data);
	}
	openEditDialog(e) {
		this.objectData = e.target.getAttribute('item-json') &&
			JSON.parse(e.target.getAttribute('item-json')) || {};
		this.shadowRoot.querySelector('#create-question-dialog').open();
	}
	renderRow(item) {
		return html`
		<li item-id="${item.Id}">
			<div>
				<d2l-icon class="drag-handle" icon="d2l-tier1:dragger"></d2l-icon>
			</div>
			<div>
				${item.QuestionText}
				<d2l-dropdown-context-menu>
					<d2l-dropdown-content id="questionDropdown-${item.Id}">
						<d2l-menu>
							<d2l-menu-item item-id="${item.Id}" @click="${this.openEditDialog}" text="${this.localize('edit')}" item-json="${JSON.stringify(item)}"></d2l-menu-item>
							${item.InUse ? html`` : html`
							<d2l-menu-item
								item-id="${item.Id}"
								@click="${this.delete}"
								text="${this.localize('delete')}"></d2l-menu-item>`}
						</d2l-menu>
					</d2l-dropdown-content>
				</d2l-dropdown-context-menu>
			</div>
		</li>
		`;
	}
	save() {
		this.objectData.QuestionText = this.shadowRoot.querySelector('#objectName').value;

		if (!this.objectData.Id) {
			this.objectData.SortOrder = 0;
			this.cpdService.createQuestion(this.objectData)
				.then(() => this.fetchQuestions()
					.then(() => this.objectData = {}));
		} else {
			this.cpdService.updateQuestion(this.objectData.Id, this.objectData)
				.then(() => this.fetchQuestions());
		}

	}
	async sorted(e) {
		this.sortable = false;
		const itemId = this.questions[e.detail.oldIndex].Id;
		const newSortOrder = e.detail.newIndex + 1;
		this.showContent = false;
		await this.cpdService.updateItemSortOrder('question', itemId, newSortOrder);
		await this.fetchQuestions();
		this.sortable = true;
		this.showContent = true;
	}
	renderList() {
		if (!this.showContent) {
			return html``;
		}
		return html`
		<ul @d2l-dnd-sorted="${this.sorted}">
			<d2l-dnd-sortable handle=".drag-handle" ?disabled="${!this.sortable}">
				${this.questions && this.questions.map(question => this.renderRow(question))}
			</d2l-dnd-sortable>
		</ul>
		`;
	}
	render() {
		return html`
		<div>
			<d2l-button primary @click="${this.openEditDialog}">${this.localize('addQuestion')}</d2l-button>
		</div>
		${this.renderList()}
		<div>
			<d2l-dialog id="create-question-dialog" title-text="${this.objectData && this.objectData.QuestionText ? this.localize('editQuestion') : this.localize('addQuestion')}">
				<d2l-input-text
					id="objectName"
					label="${this.localize('questionName')}"
					placeholder="${this.localize('questionNamePlaceholder')}"
					value=${this.objectData && this.objectData.QuestionText || ''}>
				</d2l-input-text>
				<d2l-button @click="${this.save}" dialog-action primary>${this.localize('save')}</d2l-button>
				<d2l-button dialog-action>${this.localize('cancel')}</d2l-button>
			</d2l-dialog>
		</div>
		`;
	}
}
customElements.define('d2l-cpd-admin-questions', CpdAdminQuestions);
