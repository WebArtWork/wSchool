import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { SchoolsProfileComponent } from './schools-profile.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: SchoolsProfileComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [SchoolsProfileComponent]
})
export class SchoolsProfileModule {}
