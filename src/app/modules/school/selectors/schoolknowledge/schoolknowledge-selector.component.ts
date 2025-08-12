import {
	Component,
	EventEmitter,
	Input,
	OnChanges,
	Output,
	SimpleChanges
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { Schoolknowledge } from '../../interfaces/schoolknowledge.interface';
import { SchoolknowledgeService } from '../../services/schoolknowledge.service';

@Component({
	selector: 'schoolknowledge-selector',
	templateUrl: './schoolknowledge-selector.component.html',
	styleUrls: ['./schoolknowledge-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Schoolknowledge[] {
		return this._schoolknowledgeService.schoolknowledges;
	}

	constructor(private _schoolknowledgeService: SchoolknowledgeService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
