import { Injectable } from '@angular/core';
import { CrudService } from 'wacom';
import { Schoolsession } from '../interfaces/schoolsession.interface';

@Injectable({
	providedIn: 'root'
})
export class SchoolsessionService extends CrudService<Schoolsession> {
	schoolsessions: Schoolsession[] = this.getDocs();

	schoolsessionsByCourse: Record<string, Schoolsession[]> = {};

	constructor() {
		super({
			name: 'schoolsession'
		});

		this.get();

		this.filteredDocuments(this.schoolsessionsByCourse, 'course');
	}
}
