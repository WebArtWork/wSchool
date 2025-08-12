import {
	Component,
	EventEmitter,
	Input,
	OnChanges,
	Output,
	SimpleChanges
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { Schooltest } from '../../interfaces/schooltest.interface';
import { SchooltestService } from '../../services/schooltest.service';

@Component({
	selector: 'schooltest-selector',
	templateUrl: './schooltest-selector.component.html',
	styleUrls: ['./schooltest-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Schooltest[] {
		return this._schooltestService.schooltests;
	}

	constructor(private _schooltestService: SchooltestService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
