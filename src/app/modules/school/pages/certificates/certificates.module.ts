import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreModule } from 'src/app/core/core.module';
import { TableComponent } from 'src/app/core/modules/table/table.component';
import { CertificatesComponent } from './certificates.component';

const routes: Routes = [
	{
		path: '',
		component: CertificatesComponent
	},
	{
		path: 'course/:schoolcertificate',
		component: CertificatesComponent
	},
	{
		path: 'test/:schoolcertificate',
		component: CertificatesComponent
	},
	{
		path: 'school/:school',
		component: CertificatesComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule, TableComponent],
	declarations: [CertificatesComponent],
	providers: []
})
export class CertificatesModule {}
