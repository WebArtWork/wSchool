import { CrudDocument } from 'wacom';

export interface Schooltestquestion {
	question: string;
	type: 'Text' | 'Radio' | 'Checkbox' | 'ArrayTexts' | 'TwoArrayConnects';
	answers: string[];
	connectTo: string[];
	text: string;
	radio: string;
	checkboxes: string[];
	arrayTexts: string[];
	twoArrayConnects: number[];
}

export interface Schooltest extends CrudDocument {
	name: string;
	description: string;
	course: string;
	lesson: string;
	school: string;
	duration: number;
	questions: Schooltestquestion[];
}
