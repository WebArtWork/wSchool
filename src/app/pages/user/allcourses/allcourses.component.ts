import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/modules/user/services/user.service';
import { Schoolcourse } from '../../../modules/school/interfaces/schoolcourse.interface';
import { SchoolcourseService } from '../../../modules/school/services/schoolcourse.service';

@Component({
	templateUrl: './allcourses.component.html',
	styleUrls: ['./allcourses.component.scss'],
	standalone: false
})
export class AllcoursesComponent {
	isMenuOpen = false;

	courses: Schoolcourse[] = [];

	columns = [
		'name',
		'description',
		'duration',
		'learning',
		'included',
		'requirements',
		'cost',
		'status'
	];

	constructor(
		private _schoolcourseService: SchoolcourseService,
		public userService: UserService,
		private _router: Router
	) {
		this._schoolcourseService
			.get({}, { name: 'public' })
			.subscribe((courses: Schoolcourse[]) => {
				console.log('All public courses:', courses);

				this.courses = courses;

				// TODO Leonid remove below block, this is just until we don't have courses on page
				if (courses.length) {
					this._router.navigateByUrl('/course/' + courses[0]._id);
				}
			});
	}

	back(): void {
		window.history.back();
	}

	filters = {
		costFrom: null as number | null,
		costTo: null as number | null,
		durationFrom: null as number | null,
		durationTo: null as number | null,
		status: {
			Active: true,
			Inactive: true
		} as { [key: string]: boolean }
	};

	filteredCourses() {
		return this.courses.filter((course) => {
			const costValid =
				(this.filters.costFrom == null ||
					course.cost >= this.filters.costFrom) &&
				(this.filters.costTo == null ||
					course.cost <= this.filters.costTo);

			const durationValid =
				(this.filters.durationFrom == null ||
					course.duration >= this.filters.durationFrom) &&
				(this.filters.durationTo == null ||
					course.duration <= this.filters.durationTo);

			const statusValid = this.filters.status[course.status];

			return costValid && durationValid && statusValid;
		});
	}
}
