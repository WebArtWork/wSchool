import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { SchoolService } from '../../services/school.service';
import { School } from '../../interfaces/school.interface';

@Component({
	selector: 'school-selector',
	templateUrl: './school-selector.component.html',
	styleUrls: ['./school-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): School[] {
		return this._schoolService.schools;
	}

	constructor(private _schoolService: SchoolService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
