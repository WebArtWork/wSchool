import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreModule } from 'src/app/core/core.module';
import { CertificatesComponent } from './certificates.component';

const routes: Routes = [
	{
		path: '',
		component: CertificatesComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [CertificatesComponent]
})
export class CertificatesModule {}
