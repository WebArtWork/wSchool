import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { SchoolComponent } from './school.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
	path: '',
	component: SchoolComponent
}];

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		CoreModule
	],
	declarations: [
		SchoolComponent
	],
	providers: []

})

export class SchoolModule { }
