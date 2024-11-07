import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { DashboardOwnerComponent } from './dashboard-owner.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: DashboardOwnerComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [DashboardOwnerComponent]
})
export class DashboardOwnerModule {}
