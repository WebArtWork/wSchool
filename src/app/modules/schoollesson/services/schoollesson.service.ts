import { Injectable } from "@angular/core";
import {
  AlertService,
  CoreService,
  HttpService,
  StoreService,
  CrudService,
  CrudDocument,
} from "wacom";

export interface Schoollesson extends CrudDocument {
  name: string;
  description: string;
}

@Injectable({
  providedIn: "root",
})
export class SchoollessonService extends CrudService<Schoollesson> {
  schoollessons: Schoollesson[] = [];
  constructor(
    _http: HttpService,
    _store: StoreService,
    _alert: AlertService,
    _core: CoreService
  ) {
    super(
      {
        name: "schoollesson",
      },
      _http,
      _store,
      _alert,
      _core
    );

    this.get().subscribe((schoollessons: Schoollesson[]) => this.schoollessons.push(...schoollessons));

    _core.on("schoollesson_create").subscribe((schoollesson: Schoollesson) => {
      this.schoollessons.push(schoollesson);
    });

    _core.on("schoollesson_delete").subscribe((schoollesson: Schoollesson) => {
      this.schoollessons.splice(
        this.schoollessons.findIndex((o) => o._id === schoollesson._id),
        1
      );
    });
  }
}
