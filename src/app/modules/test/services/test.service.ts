import { Injectable } from "@angular/core";
import {
  AlertService,
  CoreService,
  HttpService,
  StoreService,
  CrudService,
  CrudDocument,
} from "wacom";

export interface Test extends CrudDocument {
  name: string;
  description: string;
}

@Injectable({
  providedIn: "root",
})
export class TestService extends CrudService<Test> {
  tests: Test[] = [];
  constructor(
    _http: HttpService,
    _store: StoreService,
    _alert: AlertService,
    _core: CoreService
  ) {
    super(
      {
        name: "test",
      },
      _http,
      _store,
      _alert,
      _core
    );

    this.get().subscribe((tests: Test[]) => this.tests.push(...tests));

    _core.on("test_create").subscribe((test: Test) => {
      this.tests.push(test);
    });

    _core.on("test_delete").subscribe((test: Test) => {
      this.tests.splice(
        this.tests.findIndex((o) => o._id === test._id),
        1
      );
    });
  }
}
