import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreModule } from 'src/app/core/core.module';
import { ButtonComponent } from 'src/app/core/modules/button/button.component';
import { FormComponent } from 'src/app/core/modules/form/form.component';
import { TableComponent } from 'src/app/core/modules/table/table.component';
import { TestQuestionsComponent } from './test-questions/test-questions.component';
import { TestsComponent } from './tests.component';

const routes: Routes = [
	{
		path: '',
		component: TestsComponent
	},
	{
		path: 'school/:schooltest',
		component: TestsComponent
	},
	{
		path: 'course/:schooltest',
		component: TestsComponent
	},
	{
		path: 'lesson/:schooltest',
		component: TestsComponent
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		CoreModule,
		TableComponent,
		FormComponent,
		ButtonComponent
	],
	declarations: [TestsComponent, TestQuestionsComponent],
	providers: []
})
export class TestsModule {}
