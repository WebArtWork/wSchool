import { Injectable } from "@angular/core";
import {
  AlertService,
  CoreService,
  HttpService,
  StoreService,
  CrudService,
  CrudDocument,
} from "wacom";

export interface Certificate extends CrudDocument {
  name: string;
  description: string;
}

@Injectable({
  providedIn: "root",
})
export class CertificateService extends CrudService<Certificate> {
  certificates: Certificate[] = [];
  constructor(
    _http: HttpService,
    _store: StoreService,
    _alert: AlertService,
    _core: CoreService
  ) {
    super(
      {
        name: "certificate",
      },
      _http,
      _store,
      _alert,
      _core
    );

    this.get().subscribe((certificates: Certificate[]) => this.certificates.push(...certificates));

    _core.on("certificate_create").subscribe((certificate: Certificate) => {
      this.certificates.push(certificate);
    });

    _core.on("certificate_delete").subscribe((certificate: Certificate) => {
      this.certificates.splice(
        this.certificates.findIndex((o) => o._id === certificate._id),
        1
      );
    });
  }
}
