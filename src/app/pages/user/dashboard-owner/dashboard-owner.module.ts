import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { Dashboard-ownerComponent } from './dashboard-owner.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: Dashboard-ownerComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [Dashboard-ownerComponent]
})
export class Dashboard-ownerModule {}
