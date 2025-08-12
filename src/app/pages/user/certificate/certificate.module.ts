import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreModule } from 'src/app/core/core.module';
import { CertificateComponent } from './certificate.component';

const routes: Routes = [
	{
		path: '',
		component: CertificateComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [CertificateComponent]
})
export class CertificateModule {}
