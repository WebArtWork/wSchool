import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreModule } from 'src/app/core/core.module';
import { AllcoursesComponent } from './allcourses.component';

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
