import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreModule } from 'src/app/core/core.module';
import { TableComponent } from 'src/app/core/modules/table/table.component';
import { SchoolsComponent } from './schools.component';

const routes: Routes = [
	{
		path: '',
		component: SchoolsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule, TableComponent],
	declarations: [SchoolsComponent],
	providers: []
})
export class SchoolsModule {}
