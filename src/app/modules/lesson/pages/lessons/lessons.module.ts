import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { LessonsComponent } from './lessons.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
	path: '',
	component: LessonsComponent
}];

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		CoreModule
	],
	declarations: [
		LessonsComponent
	],
	providers: []

})

export class LessonsModule { }
