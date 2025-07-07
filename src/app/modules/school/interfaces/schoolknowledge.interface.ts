import { CrudDocument } from 'wacom';

export interface Schoolknowledge extends CrudDocument {
	title: string;
	level: number;
	school: string;
	knowledge: string;
}
