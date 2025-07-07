import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { SchoolcertificateService } from '../../services/schoolcertificate.service';
import { Schoolcertificate } from '../../interfaces/schoolcertificate.interface';

@Component({
	selector: 'schoolcertificate-selector',
	templateUrl: './schoolcertificate-selector.component.html',
	styleUrls: ['./schoolcertificate-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Schoolcertificate[] {
		return this._schoolcertificateService.schoolcertificates;
	}

	constructor(private _schoolcertificateService: SchoolcertificateService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
