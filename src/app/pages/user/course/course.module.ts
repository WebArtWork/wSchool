import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreModule } from 'src/app/core/core.module';
import { CourseComponent } from './course.component';

const routes: Routes = [
	{
		path: ':id',
		component: CourseComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [CourseComponent]
})
export class CourseModule {}
