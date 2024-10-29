import { Injectable } from "@angular/core";
import {
  AlertService,
  CoreService,
  HttpService,
  StoreService,
  CrudService,
  CrudDocument,
} from "wacom";

export interface Schoolcourse extends CrudDocument {
  name: string;
  description: string;
}

@Injectable({
  providedIn: "root",
})
export class SchoolcourseService extends CrudService<Schoolcourse> {
  schoolcourses: Schoolcourse[] = [];
  constructor(
    _http: HttpService,
    _store: StoreService,
    _alert: AlertService,
    _core: CoreService
  ) {
    super(
      {
        name: "schoolcourse",
      },
      _http,
      _store,
      _alert,
      _core
    );

    this.get().subscribe((schoolcourses: Schoolcourse[]) => this.schoolcourses.push(...schoolcourses));

    _core.on("schoolcourse_create").subscribe((schoolcourse: Schoolcourse) => {
      this.schoolcourses.push(schoolcourse);
    });

    _core.on("schoolcourse_delete").subscribe((schoolcourse: Schoolcourse) => {
      this.schoolcourses.splice(
        this.schoolcourses.findIndex((o) => o._id === schoolcourse._id),
        1
      );
    });
  }
}
