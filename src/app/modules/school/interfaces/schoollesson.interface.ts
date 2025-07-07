import { CrudDocument } from 'wacom';

export interface Schoollesson extends CrudDocument {
	name: string;
	shortDescription: string;
	description: string;
	order: number;
	course: string;
}
