import { Injectable } from "@angular/core";
import {
  AlertService,
  CoreService,
  HttpService,
  StoreService,
  CrudService,
  CrudDocument,
} from "wacom";

export interface School extends CrudDocument {
  name: string;
  description: string;
}

@Injectable({
  providedIn: "root",
})
export class SchoolService extends CrudService<School> {
  schools: School[] = [];
  constructor(
    _http: HttpService,
    _store: StoreService,
    _alert: AlertService,
    _core: CoreService
  ) {
    super(
      {
        name: "school",
      },
      _http,
      _store,
      _alert,
      _core
    );

    this.get().subscribe((schools: School[]) => this.schools.push(...schools));

    _core.on("school_create").subscribe((school: School) => {
      this.schools.push(school);
    });

    _core.on("school_delete").subscribe((school: School) => {
      this.schools.splice(
        this.schools.findIndex((o) => o._id === school._id),
        1
      );
    });
  }
}
