import { Injectable } from '@angular/core';
import { CrudService } from 'wacom';
import { Schoolcourse } from '../interfaces/schoolcourse.interface';

@Injectable({
	providedIn: 'root'
})
export class SchoolcourseService extends CrudService<Schoolcourse> {
	schoolcourses: Schoolcourse[] = this.getDocs();

	schoolcoursesBySchool: Record<string, Schoolcourse[]> = {};

	schoolcoursesByAuthor: Record<string, Schoolcourse[]> = {};

	constructor() {
		super({
			name: 'schoolcourse',
			replace: (doc: Schoolcourse) => {
				doc.thumb = doc.thumb || 'assets/logo.png';
			}
		});

		this.get();

		this.filteredDocuments(
			this.schoolcoursesBySchool,
			'school',
			undefined,
			(a, b) => a.order - b.order
		);

		this.filteredDocuments(
			this.schoolcoursesByAuthor,
			'author',
			undefined,
			(a, b) => a.order - b.order
		);
	}
}
