import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { TestsComponent } from './tests.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
	path: '',
	component: TestsComponent
}, {
	path: 'schools/:schooltest',
	component: TestsComponent
}, {
	path: 'courses/:schooltest',
	component: TestsComponent
}, {
	path: 'lessons/:schooltest',
	component: TestsComponent
}];

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		CoreModule
	],
	declarations: [
		TestsComponent
	],
	providers: []

})

export class TestsModule { }
