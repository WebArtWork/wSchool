import { Injectable } from '@angular/core';
import { Schoolcertificate } from '../interfaces/schoolcertificate.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root'
})
export class SchoolcertificateService extends CrudService<Schoolcertificate> {
	schoolcertificates: Schoolcertificate[] = this.getDocs();

	schoolcertificatesByModuleId: Record<string, Schoolcertificate[]> = {};

	schoolcertificatesByAuthorstatus: Record<string, Schoolcertificate[]> = {};

	constructor() {
		super({
			name: 'schoolcertificate',
			replace: (certificate: Schoolcertificate): void => {
				certificate.authorstatus =
					certificate.author + certificate.status;
			}
		});

		this.get();

		this.filteredDocuments(this.schoolcertificatesByModuleId, 'moduleId');

		this.filteredDocuments(
			this.schoolcertificatesByAuthorstatus,
			'authorstatus'
		);
	}
}
