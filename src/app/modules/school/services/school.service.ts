import { Injectable } from '@angular/core';
import { School } from '../interfaces/school.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root'
})
export class SchoolService extends CrudService<School> {
	schools: School[] = this.getDocs();

	constructor() {
		super({
			name: 'school'
		});

		this.get();
	}
}
