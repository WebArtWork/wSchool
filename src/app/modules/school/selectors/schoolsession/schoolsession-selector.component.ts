import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { SchoolsessionService } from '../../services/schoolsession.service';
import { Schoolsession } from '../../interfaces/schoolsession.interface';

@Component({
	selector: 'schoolsession-selector',
	templateUrl: './schoolsession-selector.component.html',
	styleUrls: ['./schoolsession-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Schoolsession[] {
		return this._schoolsessionService.schoolsessions;
	}

	constructor(private _schoolsessionService: SchoolsessionService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
