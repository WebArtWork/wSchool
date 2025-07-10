import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoollessonService } from '../../services/schoollesson.service';
import { Schoollesson } from '../../interfaces/schoollesson.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { schoollessonFormComponents } from '../../formcomponents/schoollesson.formcomponents';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { TableModule } from 'src/app/core/modules/table/table.module';
import { CrudComponent } from 'wacom';
import { Router } from '@angular/router';
import { UserService } from 'src/app/modules/user/services/user.service';

@Component({
	imports: [CommonModule, TableModule],
	templateUrl: './lessons.component.html',
	styleUrls: ['./lessons.component.scss']
})
export class LessonsComponent extends CrudComponent<
	SchoollessonService,
	Schoollesson,
	FormInterface
> {
	course = this._router.url.includes('/lessons/')
		? this._router.url.split('/')[this._router.url.split('/').length - 1]
		: '';

	override allowCreate(): boolean {
		return (
			this._userService.role('admin') ||
			this._userService.role('schoolowner') ||
			this._userService.role('schoolteacher')
		);
	}

	override allowMutate(): boolean {
		return this.allowCreate();
	}

	override allowSort(): boolean {
		return true;
	}

	override preCreate(doc: Schoollesson): void {
		delete doc.__created;

		if (this.course) {
			doc.course = this.course;
		}
	}

	override configType: 'local' | 'server' = 'local';

	columns = ['name'];

	config = this.getConfig();

	constructor(
		_schoollessonService: SchoollessonService,
		private _userService: UserService,
		_translate: TranslateService,
		private _router: Router,
		_form: FormService
	) {
		super(
			schoollessonFormComponents,
			_form,
			_translate,
			_schoollessonService
		);

		this.setDocuments();

		this.config.buttons.push({
			icon: 'assignment',
			hrefFunc: (doc: Schoollesson) =>
				this._roleUrl() + 'tests/lesson/' + doc._id
		});
	}

	private _roleUrl(): string {
		return this._userService.role('admin')
			? '/admin/'
			: this._userService.role('schoolowner')
			? '/owner/'
			: this._userService.role('schoolteacher')
			? '/teacher/'
			: '/';
	}
}
