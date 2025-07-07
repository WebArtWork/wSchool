import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { SchoolcourseService } from '../../services/schoolcourse.service';
import { Schoolcourse } from '../../interfaces/schoolcourse.interface';

@Component({
	selector: 'schoolcourse-selector',
	templateUrl: './schoolcourse-selector.component.html',
	styleUrls: ['./schoolcourse-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Schoolcourse[] {
		return this._schoolcourseService.schoolcourses;
	}

	constructor(private _schoolcourseService: SchoolcourseService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
