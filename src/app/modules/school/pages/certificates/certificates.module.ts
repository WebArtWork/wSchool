import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { CertificatesComponent } from './certificates.component';
import { Routes, RouterModule } from '@angular/router';

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
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [CertificatesComponent],
	providers: []
})
export class CertificatesModule {}
