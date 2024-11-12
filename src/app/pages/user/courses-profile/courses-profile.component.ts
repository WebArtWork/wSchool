import { Component } from '@angular/core';
import { SchoolcourseService } from "src/app/modules/schoolcourse/services/schoolcourse.service";

@Component({
	templateUrl: './courses-profile.component.html',
	styleUrls: ['./courses-profile.component.scss'],
})
export class CoursesProfileComponent {
	constructor(
		public scs: SchoolcourseService
	) { }
}
