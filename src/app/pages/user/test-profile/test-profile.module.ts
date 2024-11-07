import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { TestProfileComponent } from './test-profile.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: TestProfileComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [TestProfileComponent]
})
export class TestProfileModule {}
