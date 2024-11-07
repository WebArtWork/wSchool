import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { DashboardTeacherComponent } from './dashboard-teacher.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: DashboardTeacherComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [DashboardTeacherComponent]
})
export class DashboardTeacherModule {}
