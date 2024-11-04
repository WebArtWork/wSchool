import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { CertificatesComponent } from './certificates.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
	path: '',
	component: CertificatesComponent
}, {
	path: 'courses/:schoolcertificate',
	component: CertificatesComponent
}, {
	path: 'tests/:schoolcertificate',
	component: CertificatesComponent
}];

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		CoreModule
	],
	declarations: [
		CertificatesComponent
	],
	providers: []

})

export class CertificatesModule { }
