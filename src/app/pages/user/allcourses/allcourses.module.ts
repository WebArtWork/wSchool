import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { AllcoursesComponent } from './allcourses.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: AllcoursesComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [AllcoursesComponent]
})
export class AllcoursesModule {}
