import { Injectable } from '@angular/core';
import { CrudService } from 'wacom';
import { Schoollesson } from '../interfaces/schoollesson.interface';

@Injectable({
	providedIn: 'root'
})
export class SchoollessonService extends CrudService<Schoollesson> {
	schoollessons: Schoollesson[] = this.getDocs();

	schoollessonsByAuthor: Record<string, Schoollesson[]> = {};

	constructor() {
		super({
			name: 'schoollesson'
		});

		this.get();

		this.filteredDocuments(this.schoollessonsByAuthor);
	}
}
