import { Injectable } from "@angular/core";
import {
  AlertService,
  CoreService,
  HttpService,
  StoreService,
  CrudService,
  CrudDocument,
} from "wacom";

export interface Schooltest extends CrudDocument {
  name: string;
  description: string;
}

@Injectable({
  providedIn: "root",
})
export class SchooltestService extends CrudService<Schooltest> {
  schooltests: Schooltest[] = [];
  constructor(
    _http: HttpService,
    _store: StoreService,
    _alert: AlertService,
    _core: CoreService
  ) {
    super(
      {
        name: "schooltest",
      },
      _http,
      _store,
      _alert,
      _core
    );

    this.get().subscribe((schooltests: Schooltest[]) => this.schooltests.push(...schooltests));

    _core.on("schooltest_create").subscribe((schooltest: Schooltest) => {
      this.schooltests.push(schooltest);
    });

    _core.on("schooltest_delete").subscribe((schooltest: Schooltest) => {
      this.schooltests.splice(
        this.schooltests.findIndex((o) => o._id === schooltest._id),
        1
      );
    });
  }
}
