import {
	Component,
	EventEmitter,
	Input,
	OnChanges,
	Output,
	SimpleChanges
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { Schoolcourse } from '../../interfaces/schoolcourse.interface';
import { SchoolcourseService } from '../../services/schoolcourse.service';

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
