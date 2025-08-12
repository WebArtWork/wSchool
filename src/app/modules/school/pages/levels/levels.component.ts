import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormService } from 'src/app/core/modules/form/form.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { UserService } from 'src/app/modules/user/services/user.service';
import { AlertService, CoreService } from 'wacom';
import { schoolknowledgeFormComponents } from '../../formcomponents/schoolknowledge.formcomponents';
import { Schoolknowledge } from '../../interfaces/schoolknowledge.interface';
import { SchoolknowledgeService } from '../../services/schoolknowledge.service';

@Component({
	templateUrl: './levels.component.html',
	styleUrls: ['./levels.component.scss'],
	standalone: false
})
export class LevelsComponent implements OnInit {
	school: string;

	knowledge: string;

	columns = ['title', 'require'];

	form: FormInterface = this._form.getForm(
		'schoolknowledge',
		schoolknowledgeFormComponents
	);

	config = {
		create: (): void => {
			this._form.modal<Schoolknowledge>(this.form, {
				label: 'Create',
				click: (created: unknown, close: () => void) => {
					this._preCreate(created as Schoolknowledge);

					this.sks.create(created as Schoolknowledge);

					close();
				}
			});
		},
		update: (doc: Schoolknowledge): void => {
			this._form
				.modal<Schoolknowledge>(this.form, [], doc)
				.then((updated: Schoolknowledge) => {
					this._core.copy(updated, doc);

					this.sks.update(doc);
				});
		},
		delete: (doc: Schoolknowledge): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this schoolknowledge?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: (): void => {
							this.sks.delete(doc);
						}
					}
				]
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Schoolknowledge): void => {
					this._form.modalUnique<Schoolknowledge>(
						'schoolknowledge',
						'url',
						doc
					);
				}
			},
			{
				icon: 'auto_stories',
				hrefFunc: (doc: Schoolknowledge): string => {
					return (
						this._roleUrl() +
						'levels/' +
						this.school +
						'/' +
						doc._id
					);
				}
			}
		],
		headerButtons: [
			{
				icon: 'playlist_add',
				click: this._bulkManagement(),
				class: 'playlist'
			},
			{
				icon: 'edit_note',
				click: this._bulkManagement(false),
				class: 'edit'
			}
		]
	};

	get rows(): Schoolknowledge[] {
		return this.knowledge
			? this.sks.schoolknowledgesByKnowledge[this.knowledge]
			: this.sks.schoolknowledgesBySchool[this.school];
	}

	constructor(
		public sks: SchoolknowledgeService,
		private _translate: TranslateService,
		private route: ActivatedRoute,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService,
		private _us: UserService
	) {}

	ngOnInit(): void {
		this.route.params.subscribe((params) => {
			this.school = params['school'] || '';

			this.knowledge = params['knowledge'] || '';
		});
	}

	private _bulkManagement(create = true): () => void {
		return (): void => {
			this._form
				.modalDocs<Schoolknowledge>(create ? [] : this.rows)
				.then((schoolknowledges: Schoolknowledge[]) => {
					if (create) {
						for (const schoolknowledge of schoolknowledges) {
							this._preCreate(schoolknowledge);

							this.sks.create(schoolknowledge);
						}
					} else {
						for (const schoolknowledge of this.rows) {
							if (
								!schoolknowledges.find(
									(localSchoolknowledge) =>
										localSchoolknowledge._id ===
										schoolknowledge._id
								)
							) {
								this.sks.delete(schoolknowledge);
							}
						}

						for (const schoolknowledge of schoolknowledges) {
							const localSchoolknowledge = this.rows.find(
								(localSchoolknowledge) =>
									localSchoolknowledge._id ===
									schoolknowledge._id
							);

							if (localSchoolknowledge) {
								this._core.copy(
									schoolknowledge,
									localSchoolknowledge
								);

								this.sks.update(localSchoolknowledge);
							} else {
								this._preCreate(schoolknowledge);

								this.sks.create(schoolknowledge);
							}
						}
					}
				});
		};
	}

	private _preCreate(schoolknowledge: Schoolknowledge): void {
		schoolknowledge.__created;

		if (this.school) {
			schoolknowledge.school = this.school;
		}

		if (this.knowledge) {
			schoolknowledge.knowledge = this.knowledge;
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
