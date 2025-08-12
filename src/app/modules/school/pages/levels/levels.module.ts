import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreModule } from 'src/app/core/core.module';
import { LevelsComponent } from './levels.component';

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
