import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreModule } from 'src/app/core/core.module';
import { CoursesComponent } from './courses.component';

const routes: Routes = [
	{
		path: '',
		component: CoursesComponent
	},
	{
		path: ':schoolcourse',
		component: CoursesComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [CoursesComponent],
	providers: []
})
export class CoursesModule {}
