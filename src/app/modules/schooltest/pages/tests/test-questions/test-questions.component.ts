import { Component } from '@angular/core';
import { Schooltest, Schooltestquestion, SchooltestService } from '../../../services/schooltest.service';
import { FormService } from 'src/app/core/modules/form/form.service';

@Component({
  selector: 'app-test-questions',
  templateUrl: './test-questions.component.html',
  styleUrl: './test-questions.component.scss'
})
export class TestQuestionsComponent {
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
        key: 'text',
        focused: true,
        fields: [
          {
            name: 'Placeholder',
            value: 'fill questions text',
          },
          {
            name: 'Label',
            value: 'Text',
          }
        ],
      },
      {
        name: 'Select',
        key: 'type',
        focused: true,
        fields: [
          {
            name: 'Placeholder',
            value: 'select questions type',
          },
          {
            name: 'Label',
            value: 'Type',
          },
          {
            name: 'Items',
            value: ['Text', 'Radio', 'Checkbox', 'ArrayTexts', 'TwoArrayConnects']
          }
        ],
      },
      {
        name: 'Tags',
        key: 'answers',
        fields: [
          {
            name: 'Button',
            value: 'Add answers',
          },
          {
            name: 'Placeholder',
            value: 'fill questions answers',
          },
          {
            name: 'Label',
            value: 'Answers',
          }
        ],
      },
      {
        name: 'Tags',
        key: 'connectTo',
        fields: [
          {
            name: 'Button',
            value: 'Add connectTo',
          },
          {
            name: 'Placeholder',
            value: 'fill questions connections',
          },
          {
            name: 'Label',
            value: 'ConnectTo',
          }
        ],
      },
    ],
  });

  addQuestion(): void {
    this.test.questions.push({} as Schooltestquestion)
  }

  update() {
    this._sts.update(this.test);
  }

  constructor(
    private _sts: SchooltestService,
    private _form: FormService
  ) { }
}