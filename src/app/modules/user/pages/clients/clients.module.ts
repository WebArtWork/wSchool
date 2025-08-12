import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreModule } from 'src/app/core/core.module';
import { ClientsComponent } from './clients.component';

const routes: Routes = [
	{
		path: '',
		component: ClientsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [ClientsComponent],
	providers: []
})
export class ClientsModule {}
