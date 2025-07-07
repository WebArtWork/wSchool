import { Injectable } from '@angular/core';
import { Schoolknowledge } from '../interfaces/schoolknowledge.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root'
})
export class SchoolknowledgeService extends CrudService<Schoolknowledge> {
	schoolknowledges: Schoolknowledge[] = this.getDocs();

	schoolknowledgesBySchool: Record<string, Schoolknowledge[]> = {};

	schoolknowledgesByKnowledge: Record<string, Schoolknowledge[]> = {};

	constructor() {
		super({
			name: 'schoolknowledge'
		});

		this.get();

		this.filteredDocuments(this.schoolknowledgesBySchool, 'school');

		this.filteredDocuments(this.schoolknowledgesByKnowledge, 'knowledge');
	}
}
