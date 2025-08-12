import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreModule } from 'src/app/core/core.module';
import { SchoolsComponent } from './schools.component';

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
