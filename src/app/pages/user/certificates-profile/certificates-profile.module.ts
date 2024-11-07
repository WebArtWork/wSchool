import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { CertificatesProfileComponent } from './certificates-profile.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: CertificatesProfileComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [CertificatesProfileComponent]
})
export class CertificatesProfileModule {}
