import { CrudDocument } from 'wacom';

export interface Schoolcertificate extends CrudDocument {
	author: string;
	status: 'Pending' | 'Received' | 'Expired';
	authorstatus: string;
	course: string;
	lessons: string[];
	title: string;
	moduleType: string;
	moduleId: string;
	received: Date;
	grade: number;
	expired: Date;
	tests: string[];
}
