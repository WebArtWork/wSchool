import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { LevelsComponent } from './levels.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: LevelsComponent
	},
	{
		path: ':school',
		component: LevelsComponent
	},
	{
		path: ':school/:knowledge',
		component: LevelsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [LevelsComponent],
	providers: []
})
export class LevelsModule {}
