import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from 'src/app/core/modules/form/form.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { UserService } from 'src/app/modules/user/services/user.service';
import { AlertService, CoreService, ModalService } from 'wacom';
import { schooltestFormComponents } from '../../formcomponents/schooltest.formcomponents';
import { Schooltest } from '../../interfaces/schooltest.interface';
import { SchooltestService } from '../../services/schooltest.service';
import { TestQuestionsComponent } from './test-questions/test-questions.component';

@Component({
	templateUrl: './tests.component.html',
	styleUrls: ['./tests.component.scss'],
	standalone: false
})
export class TestsComponent {
	get hasAccess(): boolean {
		return (
			this._us.role('admin') ||
			this._us.role('schoolowner') ||
			this._us.role('schoolteacher')
		);
	}

	columns = ['_id', 'title', 'duration'];

	moduleType = this._router.url.includes('/tests/')
		? this._router.url.split('/')[this._router.url.split('/').length - 2]
		: '';

	moduleId = this._router.url.includes('/tests/')
		? this._router.url.split('/')[this._router.url.split('/').length - 1]
		: '';

	form: FormInterface = this._form.getForm(
		'schooltest',
		schooltestFormComponents
	);

	config = {
		create: this.hasAccess
			? (): void => {
					this._form.modal<Schooltest>(this.form, {
						label: 'Create',
						click: (created: unknown, close: () => void) => {
							this._preCreate(created as Schooltest);

							this._schooltestService.create(
								created as Schooltest
							);

							close();
						}
					});
				}
			: null,
		update: this.hasAccess
			? (doc: Schooltest): void => {
					this._form
						.modal<Schooltest>(this.form, [], doc)
						.then((updated: Schooltest) => {
							this._core.copy(updated, doc);

							this._schooltestService.update(doc);
						});
				}
			: null,
		delete: this.hasAccess
			? (doc: Schooltest): void => {
					this._alert.question({
						text: this._translate.translate(
							'Common.Are you sure you want to delete this schooltest?'
						),
						buttons: [
							{
								text: this._translate.translate('Common.No')
							},
							{
								text: this._translate.translate('Common.Yes'),
								callback: (): void => {
									this._schooltestService.delete(doc);
								}
							}
						]
					});
				}
			: null,
		buttons: [
			this.hasAccess
				? {
						icon: 'assignment_turned_in',
						click: (test: Schooltest) => {
							test.questions = test.questions || [];
							this._modal.show({
								component: TestQuestionsComponent,
								test
							});
						}
					}
				: null,
			this.hasAccess
				? {
						icon: 'cloud_download',
						click: (doc: Schooltest) => {
							this._form.modalUnique<Schooltest>(
								'tests',
								'url',
								doc
							);
						}
					}
				: null,
			{
				icon: 'card_membership',
				hrefFunc: (doc: Schooltest) =>
					this._roleUrl() + 'certificates/test/' + doc._id
			}
		],
		headerButtons: [
			this.hasAccess
				? {
						icon: 'playlist_add',
						click: this._bulkManagement(),
						class: 'playlist'
					}
				: null,
			this.hasAccess
				? {
						icon: 'edit_note',
						click: this._bulkManagement(false),
						class: 'edit'
					}
				: null
		]
	};

	get rows(): Schooltest[] {
		return this.moduleType
			? this._schooltestService.byId[
					this.moduleType as 'school' | 'course' | 'lesson'
				][this.moduleId]
			: this._schooltestService.schooltests;
	}

	constructor(
		private _translate: TranslateService,
		private _schooltestService: SchooltestService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService,
		private _router: Router,
		private _modal: ModalService,
		private _us: UserService
	) {}

	private _bulkManagement(create = true): () => void {
		return (): void => {
			this._form
				.modalDocs<Schooltest>(create ? [] : this.rows)
				.then((schooltests: Schooltest[]) => {
					if (create) {
						for (const schooltest of schooltests) {
							this._preCreate(schooltest);

							this._schooltestService.create(schooltest);
						}
					} else {
						for (const schooltest of this.rows) {
							if (
								!schooltests.find(
									(localSchooltest) =>
										localSchooltest._id === schooltest._id
								)
							) {
								this._schooltestService.delete(schooltest);
							}
						}

						for (const schooltest of schooltests) {
							const localSchooltest = this.rows.find(
								(localSchooltest) =>
									localSchooltest._id === schooltest._id
							);

							if (localSchooltest) {
								this._core.copy(schooltest, localSchooltest);

								this._schooltestService.update(localSchooltest);
							} else {
								this._preCreate(schooltest);

								this._schooltestService.create(schooltest);
							}
						}
					}
				});
		};
	}

	private _preCreate(schooltest: Schooltest): void {
		delete schooltest.__created;

		switch (this.moduleType) {
			case 'course':
				schooltest.course = this.moduleId;
				break;
			case 'lesson':
				schooltest.lesson = this.moduleId;
				break;
			case 'school':
				schooltest.school = this.moduleId;
				break;
		}
	}

	private _roleUrl(): string {
		return this._us.role('admin')
			? '/admin/'
			: this._us.role('schoolowner')
				? '/owner/'
				: this._us.role('schoolteacher')
					? '/teacher/'
					: '/';
	}
}
