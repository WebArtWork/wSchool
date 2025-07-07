import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input,
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { SchoollessonService } from '../../services/schoollesson.service';
import { Schoollesson } from '../../interfaces/schoollesson.interface';

@Component({
	selector: 'schoollesson-selector',
	templateUrl: './schoollesson-selector.component.html',
	styleUrls: ['./schoollesson-selector.component.scss'],
	imports: [SelectModule],
})
export class SchoollessonSelectorComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Schoollesson[] {
		return this._schoollessonService.schoollessons;
	}

	constructor(private _schoollessonService: SchoollessonService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
