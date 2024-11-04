import { inject, Injectable } from "@angular/core";
import { HelperService } from "src/app/core/services/helper.service";
import {
  AlertService,
  CoreService,
  HttpService,
  StoreService,
  CrudService,
  CrudDocument,
} from "wacom";

export interface Schoolcertificate extends CrudDocument {
  name: string;
  description: string;
  moduleType: string;
  moduleId: string;
}

@Injectable({
  providedIn: "root",
})
export class SchoolcertificateService extends CrudService<Schoolcertificate> {
  _helper = inject(HelperService)

  schoolcertificates: Schoolcertificate[] = [];

  certificatesByModuleId: Record<string, Schoolcertificate[]> = {}
  setCertificatesByModuleId = this._helper.createParentIdToChildrenIds<Schoolcertificate[]>(this.certificatesByModuleId, this.schoolcertificates, 'moduleId')

  constructor(
    _http: HttpService,
    _store: StoreService,
    _alert: AlertService,
    _core: CoreService
  ) {
    super(
      {
        name: "schoolcertificate",
      },
      _http,
      _store,
      _alert,
      _core
    );

    this.get().subscribe((schoolcertificates: Schoolcertificate[]) => {
      this.schoolcertificates.push(...schoolcertificates)

      this.setCertificatesByModuleId()
    });

    _core.on("schoolcertificate_create").subscribe((schoolcertificate: Schoolcertificate) => {
      this.schoolcertificates.push(schoolcertificate);

      this.setCertificatesByModuleId()
    });

    _core.on("schoolcertificate_delete").subscribe((schoolcertificate: Schoolcertificate) => {
      this.schoolcertificates.splice(
        this.schoolcertificates.findIndex((o) => o._id === schoolcertificate._id),
        1
      );

      this.setCertificatesByModuleId()
    });
  }
}
