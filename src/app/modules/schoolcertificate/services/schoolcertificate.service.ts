import { Injectable } from "@angular/core";
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
}

@Injectable({
  providedIn: "root",
})
export class SchoolcertificateService extends CrudService<Schoolcertificate> {
  schoolcertificates: Schoolcertificate[] = [];
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

    this.get().subscribe((schoolcertificates: Schoolcertificate[]) => this.schoolcertificates.push(...schoolcertificates));

    _core.on("schoolcertificate_create").subscribe((schoolcertificate: Schoolcertificate) => {
      this.schoolcertificates.push(schoolcertificate);
    });

    _core.on("schoolcertificate_delete").subscribe((schoolcertificate: Schoolcertificate) => {
      this.schoolcertificates.splice(
        this.schoolcertificates.findIndex((o) => o._id === schoolcertificate._id),
        1
      );
    });
  }
}
