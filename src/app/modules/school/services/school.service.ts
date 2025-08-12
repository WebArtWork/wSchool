import { Injectable } from '@angular/core';
import { CrudService } from 'wacom';
import { School } from '../interfaces/school.interface';

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
