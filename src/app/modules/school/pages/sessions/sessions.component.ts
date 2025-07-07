import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { SchoolsessionService } from '../../services/schoolsession.service';
import { Schoolsession } from '../../interfaces/schoolsession.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { schoolsessionFormComponents } from '../../formcomponents/schoolsession.formcomponents';
import { Router } from '@angular/router';
import { UserService } from 'src/app/modules/user/services/user.service';
import { SchoolcourseService } from 'src/app/modules/schoolcourse/services/schoolcourse.service';

@Component({
	templateUrl: './sessions.component.html',
	styleUrls: ['./sessions.component.scss'],
	standalone: false
})
export class SessionsComponent {
	get hasAccess(): boolean {
		return (
			!!this.course &&
			(this._us.role('admin') ||
				this._us.role('schoolowner') ||
				this._us.role('schoolteacher'))
		);
	}

	columns = ['course', 'status', 'start', 'end'];

	course = this._router.url.includes('/sessions/')
		? this._router.url.split('/')[this._router.url.split('/').length - 1]
		: '';

	form: FormInterface = this._form.getForm(
		'schoolsession',
		schoolsessionFormComponents
	);

	config = {
		create: this.hasAccess
			? (): void => {
					this._form.modal<Schoolsession>(this.form, {
						label: 'Create',
						click: (created: unknown, close: () => void) => {
							this._preCreate(created as Schoolsession);

							this._schoolsessionService.create(
								created as Schoolsession
							);

							close();
						}
					});
			  }
			: null,
		update: this.hasAccess
			? (doc: Schoolsession): void => {
					this._form
						.modal<Schoolsession>(this.form, [], doc)
						.then((updated: Schoolsession) => {
							this._core.copy(updated, doc);

							this._schoolsessionService.update(doc);
						});
			  }
			: null,
		delete: this.hasAccess
			? (doc: Schoolsession): void => {
					this._alert.question({
						text: this._translate.translate(
							'Common.Are you sure you want to delete this schoolsession?'
						),
						buttons: [
							{
								text: this._translate.translate('Common.No')
							},
							{
								text: this._translate.translate('Common.Yes'),
								callback: (): void => {
									this._schoolsessionService.delete(doc);
								}
							}
						]
					});
			  }
			: null,
		buttons: [
			this.hasAccess
				? {
						icon: 'cloud_download',
						click: (doc: Schoolsession): void => {
							this._form.modalUnique<Schoolsession>(
								'schoolsession',
								'url',
								doc
							);
						}
				  }
				: null,
			{
				icon: 'card_membership',
				hrefFunc: (doc: Schoolsession) =>
					this._roleUrl() + 'certificates/session/' + doc._id
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

	get rows(): Schoolsession[] {
		return this.course
			? this._schoolsessionService.schoolsessionsByCourse[this.course]
			: this._schoolsessionService.schoolsessions;
	}

	constructor(
		private _translate: TranslateService,
		private _schoolsessionService: SchoolsessionService,
		private _schoolcourseService: SchoolcourseService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService,
		private _router: Router,
		private _us: UserService
	) {}

	courseName(_id: string): string {
		return this._schoolcourseService.doc(_id).name;
	}

	private _bulkManagement(create = true): () => void {
		return (): void => {
			this._form
				.modalDocs<Schoolsession>(create ? [] : this.rows)
				.then((schoolsessions: Schoolsession[]) => {
					if (create) {
						for (const schoolsession of schoolsessions) {
							this._preCreate(schoolsession);

							this._schoolsessionService.create(schoolsession);
						}
					} else {
						for (const schoolsession of this.rows) {
							if (
								!schoolsessions.find(
									(localSchoolsession) =>
										localSchoolsession._id ===
										schoolsession._id
								)
							) {
								this._schoolsessionService.delete(
									schoolsession
								);
							}
						}

						for (const schoolsession of schoolsessions) {
							const localSchoolsession = this.rows.find(
								(localSchoolsession) =>
									localSchoolsession._id === schoolsession._id
							);

							if (localSchoolsession) {
								this._core.copy(
									schoolsession,
									localSchoolsession
								);

								this._schoolsessionService.update(
									localSchoolsession
								);
							} else {
								this._preCreate(schoolsession);

								this._schoolsessionService.create(
									schoolsession
								);
							}
						}
					}
				});
		};
	}

	private _preCreate(schoolsession: Schoolsession): void {
		delete schoolsession.__created;

		schoolsession.course = this.course;
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
