import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CoreService } from 'wacom';
import { ButtonComponent } from '../../../button/button.component';
import { FormComponent } from '../../form.component';
import { FormModalButton } from '../../form.service';
import { FormInterface } from '../../interfaces/form.interface';

@Component({
	templateUrl: './modal-form.component.html',
	styleUrls: ['./modal-form.component.scss'],
	imports: [FormComponent, ButtonComponent, NgClass]
})
export class ModalFormComponent {
	private _core = inject(CoreService);

	form: FormInterface;

	submition: Record<string, unknown>;

	set(submition: Record<string, unknown>): void {
		this._core.copy(submition, this.submition);

		this._core.copy(submition['data'], this.submition['data']);
	}

	close: () => void;
	// eslint-disable-next-line
	submit: (form: any) => void = (form: any) => {};
	// eslint-disable-next-line
	change: (form: any) => void = (form: any) => {};

	buttons: FormModalButton[];
}
