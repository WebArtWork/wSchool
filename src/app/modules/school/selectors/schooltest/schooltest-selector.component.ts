import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { SchooltestService } from '../../services/schooltest.service';
import { Schooltest } from '../../interfaces/schooltest.interface';

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
