import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreModule } from 'src/app/core/core.module';
import { SessionsComponent } from './sessions.component';

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
