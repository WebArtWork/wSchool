import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from 'src/app/core/modules/form/form.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { UserService } from 'src/app/modules/user/services/user.service';
import { AlertService, CoreService } from 'wacom';
import { schoolcertificateFormComponents } from '../../formcomponents/schoolcertificate.formcomponents';
import { Schoolcertificate } from '../../interfaces/schoolcertificate.interface';
import { SchoolcertificateService } from '../../services/schoolcertificate.service';

@Component({
	templateUrl: './certificates.component.html',
	styleUrls: ['./certificates.component.scss'],
	standalone: false
})
export class CertificatesComponent {
	get hasAccess(): boolean {
		return (
			this._us.role('admin') ||
			this._us.role('schoolowner') ||
			this._us.role('schoolteacher')
		);
	}

	columns = ['title', 'received', 'grade', 'expired', 'status'];

	moduleType = this._router.url.includes('/certificates/')
		? this._router.url.split('/')[this._router.url.split('/').length - 2]
		: '';

	moduleId = this._router.url.includes('/certificates/')
		? this._router.url.split('/')[this._router.url.split('/').length - 1]
		: '';

	form: FormInterface = this._form.getForm(
		'schoolcertificate',
		schoolcertificateFormComponents
	);

	config = {
		// create: (): void => {
		// 	this._form.modal<Schoolcertificate>(this.form, {
		// 		label: 'Create',
		// 		click: (created: unknown, close: () => void) => {
		// 			this._preCreate(created as Schoolcertificate);

		// 			this._schoolcertificateService.create(
		// 				created as Schoolcertificate
		// 			);

		// 			close();
		// 		}
		// 	});
		// },
		update: (doc: Schoolcertificate): void => {
			this._form
				.modal<Schoolcertificate>(this.form, [], doc)
				.then((updated: Schoolcertificate) => {
					this._core.copy(updated, doc);

					this._schoolcertificateService.update(doc);
				});
		},
		delete: (doc: Schoolcertificate): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this certificate?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: (): void => {
							this._schoolcertificateService.delete(doc);
						}
					}
				]
			});
		},
		buttons: [
			this.hasAccess
				? {
						icon: 'cloud_download',
						click: (doc: Schoolcertificate): void => {
							this._form.modalUnique<Schoolcertificate>(
								'schoolcertificate',
								'url',
								doc
							);
						}
					}
				: null
		]
		// headerButtons: [
		// 	{
		// 		icon: 'playlist_add',
		// 		click: this._bulkManagement(),
		// 		class: 'playlist'
		// 	},
		// 	{
		// 		icon: 'edit_note',
		// 		click: this._bulkManagement(false),
		// 		class: 'edit'
		// 	}
		// ]
	};

	get rows(): Schoolcertificate[] {
		return this.moduleId
			? this._schoolcertificateService.schoolcertificatesByModuleId[
					this.moduleId
				]
			: this._schoolcertificateService.schoolcertificates;
	}

	constructor(
		private _translate: TranslateService,
		private _schoolcertificateService: SchoolcertificateService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService,
		private _router: Router,
		private _us: UserService
	) {}

	private _bulkManagement(create = true): () => void {
		return (): void => {
			this._form
				.modalDocs<Schoolcertificate>(create ? [] : this.rows)
				.then((schoolcertificates: Schoolcertificate[]) => {
					if (create) {
						for (const schoolcertificate of schoolcertificates) {
							this._preCreate(schoolcertificate);

							this._schoolcertificateService.create(
								schoolcertificate
							);
						}
					} else {
						for (const schoolcertificate of this.rows) {
							if (
								!schoolcertificates.find(
									(localSchoolcertificate) =>
										localSchoolcertificate._id ===
										schoolcertificate._id
								)
							) {
								this._schoolcertificateService.delete(
									schoolcertificate
								);
							}
						}

						for (const schoolcertificate of schoolcertificates) {
							const localSchoolcertificate = this.rows.find(
								(localSchoolcertificate) =>
									localSchoolcertificate._id ===
									schoolcertificate._id
							);

							if (localSchoolcertificate) {
								this._core.copy(
									schoolcertificate,
									localSchoolcertificate
								);

								this._schoolcertificateService.update(
									localSchoolcertificate
								);
							} else {
								this._preCreate(schoolcertificate);

								this._schoolcertificateService.create(
									schoolcertificate
								);
							}
						}
					}
				});
		};
	}

	private _preCreate(schoolcertificate: Schoolcertificate): void {
		delete schoolcertificate.__created;

		if (this.moduleType) {
			schoolcertificate.moduleType = this.moduleType;
		}

		if (this.moduleId) {
			schoolcertificate.moduleId = this.moduleId;
		}
	}
}
