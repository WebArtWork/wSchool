import { CrudDocument } from 'wacom';

export interface School extends CrudDocument {
	name: string;
	description: string;
}
