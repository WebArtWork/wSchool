import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { SchoolsComponent } from './schools.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: SchoolsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [SchoolsComponent],
	providers: []
})
export class SchoolsModule {}
