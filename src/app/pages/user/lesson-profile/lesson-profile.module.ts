import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { LessonProfileComponent } from './lesson-profile.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: LessonProfileComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [LessonProfileComponent]
})
export class LessonProfileModule {}
