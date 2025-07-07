import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from 'src/app/core/modules/form/form.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { UserService } from 'src/app/modules/user/services/user.service';
import { AlertService, CoreService } from 'wacom';
import { schoolcourseFormComponents } from '../../formcomponents/schoolcourse.formcomponents';
import { Schoolcourse } from '../../interfaces/schoolcourse.interface';
import { Schoolknowledge } from '../../interfaces/schoolknowledge.interface';
import { SchoolcourseService } from '../../services/schoolcourse.service';
import { SchoolknowledgeService } from '../../services/schoolknowledge.service';

@Component({
	templateUrl: './courses.component.html',
	styleUrls: ['./courses.component.scss'],
	standalone: false
})
export class CoursesComponent implements OnDestroy {
	get hasAccess(): boolean {
		return (
			this._us.role('admin') ||
			this._us.role('schoolowner') ||
			this._us.role('schoolteacher')
		);
	}

	columns = ['name', 'duration', 'cost', 'status'];

	school = this._router.url.includes('/courses/')
		? this._router.url.split('/')[this._router.url.split('/').length - 1]
		: '';

	form: FormInterface = this._form.getForm(
		'schoolcourse',
		schoolcourseFormComponents
	);

	config = {
		create: this.hasAccess
			? (): void => {
					if (!this.school) {
						this._form.getComponent(
							schoolcourseFormComponents,
							'suggestedCourse'
						).hidden = true;

						this._form.getComponent(
							schoolcourseFormComponents,
							'requiredCourse'
						).hidden = true;
					}

					this._form.modal<Schoolcourse>(this.form, {
						label: 'Create',
						click: (created: unknown, close: () => void) => {
							this._preCreate(created as Schoolcourse);

							this._schoolcourseService.create(
								created as Schoolcourse
							);

							close();
						}
					});
				}
			: null,
		update: this.hasAccess
			? (doc: Schoolcourse): void => {
					if (!this.school) {
						if (doc.school) {
							this._form.getComponent(
								schoolcourseFormComponents,
								'suggestedCourse'
							).hidden = false;

							this._form.setValue(
								schoolcourseFormComponents,
								'suggestedCourse',
								'Items',
								this._schoolcourseService.schoolcoursesBySchool[
									doc.school
								]
							);

							this._form.getComponent(
								schoolcourseFormComponents,
								'requiredCourse'
							).hidden = false;

							this._form.setValue(
								schoolcourseFormComponents,
								'requiredCourse',
								'Items',
								this._schoolcourseService.schoolcoursesBySchool[
									doc.school
								]
							);
						} else {
							this._form.getComponent(
								schoolcourseFormComponents,
								'suggestedCourse'
							).hidden = true;

							this._form.getComponent(
								schoolcourseFormComponents,
								'requiredCourse'
							).hidden = true;
						}
					}

					this._form
						.modal<Schoolcourse>(this.form, [], doc)
						.then((updated: Schoolcourse) => {
							this._core.copy(updated, doc);

							this._schoolcourseService.update(doc);
						});
				}
			: null,
		delete: this.hasAccess
			? (doc: Schoolcourse): void => {
					this._alert.question({
						text: this._translate.translate(
							'Common.Are you sure you want to delete this schoolcourse?'
						),
						buttons: [
							{
								text: this._translate.translate('Common.No')
							},
							{
								text: this._translate.translate('Common.Yes'),
								callback: (): void => {
									this._schoolcourseService.delete(doc);
								}
							}
						]
					});
				}
			: null,
		buttons: [
			this.hasAccess
				? {
						icon: 'arrow_upward',
						click: (doc: Schoolcourse): void => {
							const index = this.rows.findIndex(
								(d) => d._id === doc._id
							);

							if (index) {
								this.rows.splice(index, 1);

								this.rows.splice(index - 1, 0, doc);
							}

							for (let i = 0; i < this.rows.length; i++) {
								if (this.rows[i].order !== i) {
									this.rows[i].order = i;

									this._schoolcourseService.update(
										this.rows[i]
									);
								}
							}
						}
					}
				: null,
			this.hasAccess
				? {
						icon: 'cloud_download',
						click: (doc: Schoolcourse): void => {
							this._form.modalUnique<Schoolcourse>(
								'schoolcourse',
								'url',
								doc
							);
						}
					}
				: null,
			{
				icon: 'event',
				hrefFunc: (doc: Schoolcourse) =>
					this._roleUrl() + 'sessions/' + doc._id
			},
			{
				icon: 'work',
				hrefFunc: (doc: Schoolcourse) =>
					this._roleUrl() + 'lessons/' + doc._id
			},
			{
				icon: 'assignment',
				hrefFunc: (doc: Schoolcourse) =>
					this._roleUrl() + 'tests/course/' + doc._id
			},
			{
				icon: 'card_membership',
				hrefFunc: (doc: Schoolcourse) =>
					this._roleUrl() + 'certificates/course/' + doc._id
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

	get rows(): Schoolcourse[] {
		return this.school
			? this._schoolcourseService.schoolcoursesBySchool[this.school]
			: this._schoolcourseService.schoolcoursesByAuthor[
					this._us.user._id
				];
	}

	constructor(
		private _schoolcourseService: SchoolcourseService,
		private _schoolknowledge: SchoolknowledgeService,
		private _translate: TranslateService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService,
		private _router: Router,
		private _us: UserService
	) {
		this._core.onComplete('schoolcourse_loaded').then(() => {
			if (this.school) {
				this._form.getComponent(
					schoolcourseFormComponents,
					'suggestedCourse'
				).hidden = false;

				this._form.setValue(
					schoolcourseFormComponents,
					'suggestedCourse',
					'Items',
					this._schoolcourseService.schoolcoursesBySchool[this.school]
				);

				this._form.getComponent(
					schoolcourseFormComponents,
					'requiredCourse'
				).hidden = false;

				this._form.setValue(
					schoolcourseFormComponents,
					'requiredCourse',
					'Items',
					this._schoolcourseService.schoolcoursesBySchool[this.school]
				);
			}
		});
	}

	ngOnDestroy(): void {
		this.onKnowledge.unsubscribe();
	}

	private _bulkManagement(create = true): () => void {
		return (): void => {
			this._form
				.modalDocs<Schoolcourse>(create ? [] : this.rows)
				.then((schoolcourses: Schoolcourse[]) => {
					if (create) {
						for (const schoolcourse of schoolcourses) {
							this._preCreate(schoolcourse);

							this._schoolcourseService.create(schoolcourse);
						}
					} else {
						for (const schoolcourse of this.rows) {
							if (
								!schoolcourses.find(
									(localSchoolcourse) =>
										localSchoolcourse._id ===
										schoolcourse._id
								)
							) {
								this._schoolcourseService.delete(schoolcourse);
							}
						}

						for (const schoolcourse of schoolcourses) {
							const localSchoolcourse = this.rows.find(
								(localSchoolcourse) =>
									localSchoolcourse._id === schoolcourse._id
							);

							if (localSchoolcourse) {
								this._core.copy(
									schoolcourse,
									localSchoolcourse
								);

								this._schoolcourseService.update(
									localSchoolcourse
								);
							} else {
								this._preCreate(schoolcourse);

								this._schoolcourseService.create(schoolcourse);
							}
						}
					}
				});
		};
	}

	private _preCreate(schoolcourse: Schoolcourse): void {
		delete schoolcourse.__created;

		if (this.school) {
			schoolcourse.school = this.school;
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

	private onKnowledge = this._core.on(`schoolknowledge_get`).subscribe(() => {
		if (this.school) {
			schoolcourseFormComponents.components[5].hidden = false;

			(
				schoolcourseFormComponents.components[5].fields[0]
					.value as unknown as Array<Schoolknowledge>
			).push(
				...this._schoolknowledge.schoolknowledgesBySchool[this.school]
			);
		}
	});
}
