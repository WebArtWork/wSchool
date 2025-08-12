import { Component, OnInit } from '@angular/core';
import { FormService } from 'src/app/core/modules/form/form.service';
import { CoreService, HttpService } from 'wacom';
import {
	Schooltest,
	Schooltestquestion
} from '../../../interfaces/schooltest.interface';

@Component({
	selector: 'app-test-questions',
	templateUrl: './test-questions.component.html',
	styleUrl: './test-questions.component.scss',
	standalone: false
})
export class TestQuestionsComponent implements OnInit {
	test: Schooltest;

	questionIndex = 0;

	get questions(): Record<string, unknown>[] {
		return this.test.questions as unknown as Record<string, unknown>[];
	}

	form = this._form.getForm('testQuestions', {
		formId: 'testQuestions',
		title: 'Question',
		components: [
			{
				name: 'Text',
				key: 'question',
				focused: true,
				fields: [
					{
						name: 'Placeholder',
						value: 'fill questions text'
					},
					{
						name: 'Label',
						value: 'Text'
					}
				]
			},
			{
				name: 'Select',
				key: 'type',
				fields: [
					{
						name: 'Placeholder',
						value: 'select questions type'
					},
					{
						name: 'Label',
						value: 'Type'
					},
					{
						name: 'Items',
						value: [
							'Text',
							'Radio',
							'Checkbox',
							'ArrayTexts',
							'TwoArrayConnects'
						]
					}
				]
			},
			{
				name: 'Tags',
				key: 'answers',
				hidden: true,
				fields: [
					{
						name: 'Button',
						value: 'Add answers'
					},
					{
						name: 'Placeholder',
						value: 'fill questions answers'
					},
					{
						name: 'Label',
						value: 'Answers'
					}
				]
			},
			{
				name: 'Tags',
				key: 'connectTo',
				hidden: true,
				fields: [
					{
						name: 'Button',
						value: 'Add connectTo'
					},
					{
						name: 'Placeholder',
						value: 'fill questions connections'
					},
					{
						name: 'Label',
						value: 'ConnectTo'
					}
				]
			},
			{
				name: 'Text',
				key: 'text',
				hidden: true,
				fields: [
					{
						name: 'Placeholder',
						value: 'fill answer text'
					},
					{
						name: 'Label',
						value: 'Answer'
					}
				]
			},
			{
				name: 'Text',
				key: 'radio',
				hidden: true,
				fields: [
					{
						name: 'Button',
						value: 'Add correct answer'
					},
					{
						name: 'Placeholder',
						value: 'fill correct answer'
					},
					{
						name: 'Label',
						value: 'Correct Answer'
					}
				]
			},
			{
				name: 'Tags',
				key: 'checkboxes',
				hidden: true,
				fields: [
					{
						name: 'Button',
						value: 'Add correct answers'
					},
					{
						name: 'Placeholder',
						value: 'fill correct answers'
					},
					{
						name: 'Label',
						value: 'Correct Answers'
					}
				]
			},
			{
				name: 'Tags',
				key: 'arrayTexts',
				hidden: true,
				fields: [
					{
						name: 'Button',
						value: 'Add correct answers'
					},
					{
						name: 'Placeholder',
						value: 'fill correct answers'
					},
					{
						name: 'Label',
						value: 'Correct Answers'
					}
				]
			},
			{
				name: 'Tags',
				key: 'twoArrayConnects',
				hidden: true,
				fields: [
					{
						name: 'Button',
						value: 'Add correct answers'
					},
					{
						name: 'Placeholder',
						value: 'fill correct answers'
					},
					{
						name: 'Label',
						value: 'Correct Answers'
					}
				]
			}
		]
	});

	constructor(
		private _form: FormService,
		private _core: CoreService,
		private _http: HttpService
	) {}

	ngOnInit(): void {
		this.change();

		this._http.post('/api/school/test/get', this.test, (resp: any) => {
			if (resp) {
				for (let i = 0; i < this.test.questions.length; i++) {
					this.test.questions[i] = {
						...this.test.questions[i],
						...resp.answers[i]
					};
				}
			}
		});
	}

	change(): void {
		const question = this.questions[this.questionIndex];

		this.form.components[2].hidden =
			!question['type'] || question['type'] === 'Text';

		this.form.components[3].hidden =
			question['type'] !== 'TwoArrayConnects';

		this.form.components[4].hidden = question['type'] !== 'Text';

		this.form.components[5].hidden = question['type'] !== 'Radio';

		this.form.components[6].hidden = question['type'] !== 'Checkbox';

		this.form.components[7].hidden = question['type'] !== 'ArrayTexts';

		this.form.components[8].hidden =
			question['type'] !== 'TwoArrayConnects';

		this.updateAfterWhile();
	}

	addQuestion(): void {
		this.test.questions.push({} as Schooltestquestion);

		this.change();
	}

	update() {
		this._http.post('/api/school/test/update', this.test);
	}

	updateAfterWhile() {
		this._core.afterWhile('question', this.update.bind(this), 2000);
	}
}
