import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { CoursesProfileComponent } from './courses-profile.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: CoursesProfileComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [CoursesProfileComponent]
})
export class CoursesProfileModule {}
