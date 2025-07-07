import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { SessionsComponent } from './sessions.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: SessionsComponent
	},
	{
		path: ':course',
		component: SessionsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [SessionsComponent],
	providers: []
})
export class SessionsModule {}
