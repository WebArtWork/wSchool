import { Component } from '@angular/core';
import { SchoolService } from "src/app/modules/school/services/school.service";

@Component({
	templateUrl: './schools-profile.component.html',
	styleUrls: ['./schools-profile.component.scss'],
})
export class SchoolsProfileComponent {
	constructor(
		public ss: SchoolService
	) { }
}
