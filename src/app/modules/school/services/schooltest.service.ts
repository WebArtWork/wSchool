import { Injectable } from '@angular/core';
import { Schooltest } from '../interfaces/schooltest.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root'
})
export class SchooltestService extends CrudService<Schooltest> {
	schooltests: Schooltest[] = this.getDocs();

	byId: {
		school: Record<string, Schooltest[]>;
		course: Record<string, Schooltest[]>;
		lesson: Record<string, Schooltest[]>;
	} = {
		school: {},
		course: {},
		lesson: {}
	};

	constructor() {
		super({
			name: 'schooltest'
		});

		this.get();

		this.filteredDocuments(this.byId.school, 'school');

		this.filteredDocuments(this.byId.course, 'course');

		this.filteredDocuments(this.byId.lesson, 'lesson');
	}
}
