import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { CourseProfileComponent } from './course-profile.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: CourseProfileComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [CourseProfileComponent]
})
export class CourseProfileModule {}
