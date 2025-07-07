import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { SchoolService } from '../../services/school.service';
import { School } from '../../interfaces/school.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { schoolFormComponents } from '../../formcomponents/school.formcomponents';
import { UserService } from 'src/app/modules/user/services/user.service';

@Component({
	templateUrl: './schools.component.html',
	styleUrls: ['./schools.component.scss'],
	standalone: false
})
export class SchoolsComponent {
	columns = ['name', 'city'];

	form: FormInterface = this._form.getForm('school', schoolFormComponents);

	config = {
		create:
			this._us.role('admin') || this._us.role('schoolowner')
				? (): void => {
						this._form.modal<School>(this.form, {
							label: 'Create',
							click: (created: unknown, close: () => void) => {
								this._preCreate(created as School);

								this._schoolService.create(created as School);

								close();
							}
						});
				  }
				: null,
		update:
			this._us.role('admin') || this._us.role('schoolowner')
				? (doc: School): void => {
						this._form
							.modal<School>(this.form, [], doc)
							.then((updated: School) => {
								this._core.copy(updated, doc);

								this._schoolService.update(doc);
							});
				  }
				: null,
		delete:
			this._us.role('admin') || this._us.role('schoolowner')
				? (doc: School): void => {
						this._alert.question({
							text: this._translate.translate(
								'Common.Are you sure you want to delete this school?'
							),
							buttons: [
								{
									text: this._translate.translate('Common.No')
								},
								{
									text: this._translate.translate(
										'Common.Yes'
									),
									callback: (): void => {
										this._schoolService.delete(doc);
									}
								}
							]
						});
				  }
				: null,
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: School): void => {
					this._form.modalUnique<School>('school', 'url', doc);
				}
			},
			{
				icon: 'auto_stories',
				hrefFunc: (doc: School): string => {
					return this._roleUrl() + 'levels/' + doc._id;
				}
			},
			{
				icon: 'menu_book',
				hrefFunc: (doc: School): string => {
					return this._roleUrl() + 'courses/' + doc._id;
				}
			},
			{
				icon: 'assignment',
				hrefFunc: (doc: School): string => {
					return this._roleUrl() + 'tests/school/' + doc._id;
				}
			},
			{
				icon: 'card_membership',
				hrefFunc: (doc: School): string => {
					return this._roleUrl() + 'certificates/school/' + doc._id;
				}
			}
		],
		headerButtons: [
			this._us.role('admin') || this._us.role('schoolowner')
				? {
						icon: 'playlist_add',
						click: this._bulkManagement(),
						class: 'playlist'
				  }
				: null,
			this._us.role('admin') || this._us.role('schoolowner')
				? {
						icon: 'edit_note',
						click: this._bulkManagement(false),
						class: 'edit'
				  }
				: null
		]
	};

	get rows(): School[] {
		return this._schoolService.schools;
	}

	constructor(
		private _translate: TranslateService,
		private _schoolService: SchoolService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService,
		private _us: UserService
	) {}

	private _bulkManagement(create = true): () => void {
		return (): void => {
			this._form
				.modalDocs<School>(create ? [] : this.rows)
				.then((schools: School[]) => {
					if (create) {
						for (const school of schools) {
							this._preCreate(school);

							this._schoolService.create(school);
						}
					} else {
						for (const school of this.rows) {
							if (
								!schools.find(
									(localSchool) =>
										localSchool._id === school._id
								)
							) {
								this._schoolService.delete(school);
							}
						}

						for (const school of schools) {
							const localSchool = this.rows.find(
								(localSchool) => localSchool._id === school._id
							);

							if (localSchool) {
								this._core.copy(school, localSchool);

								this._schoolService.update(localSchool);
							} else {
								this._preCreate(school);

								this._schoolService.create(school);
							}
						}
					}
				});
		};
	}

	private _preCreate(school: School): void {
		delete school.__created;
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
