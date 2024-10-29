import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { CoursesComponent } from './courses.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
	path: '',
	component: CoursesComponent
}, {
	path: ':schoolcourse',
	component: CoursesComponent
}];

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		CoreModule
	],
	declarations: [
		CoursesComponent
	],
	providers: []

})

export class CoursesModule { }
