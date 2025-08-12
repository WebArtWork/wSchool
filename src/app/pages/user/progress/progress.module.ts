import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreModule } from 'src/app/core/core.module';
import { ProgressComponent } from './progress.component';

const routes: Routes = [
	{
		path: ':id',
		component: ProgressComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [ProgressComponent]
})
export class ProgressModule {}
