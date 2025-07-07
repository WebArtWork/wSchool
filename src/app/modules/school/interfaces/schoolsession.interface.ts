import { CrudDocument } from 'wacom';

export interface Schoolsession extends CrudDocument {
	start: string;
	end: string;
	course: string;
}
