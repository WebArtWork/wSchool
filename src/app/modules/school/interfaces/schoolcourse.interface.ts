import { CrudDocument } from 'wacom';

export interface Schoolcourse extends CrudDocument {
	requiredCourse: string;
	suggestedCourse: string;
	learning: string[];
	included: string[];
	requirements: string[];
	author: string;
	thumb: string;
	name: string;
	description: string;
	order: number;
	school: string;
	duration: number;
	cost: number;
	status: string;
}
