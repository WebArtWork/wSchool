import { Injectable } from "@angular/core";
import {
  AlertService,
  CoreService,
  HttpService,
  StoreService,
  CrudService,
  CrudDocument,
} from "wacom";

export interface Course extends CrudDocument {
  name: string;
  description: string;
}

@Injectable({
  providedIn: "root",
})
export class CourseService extends CrudService<Course> {
  courses: Course[] = [];
  constructor(
    _http: HttpService,
    _store: StoreService,
    _alert: AlertService,
    _core: CoreService
  ) {
    super(
      {
        name: "course",
      },
      _http,
      _store,
      _alert,
      _core
    );

    this.get().subscribe((courses: Course[]) => this.courses.push(...courses));

    _core.on("course_create").subscribe((course: Course) => {
      this.courses.push(course);
    });

    _core.on("course_delete").subscribe((course: Course) => {
      this.courses.splice(
        this.courses.findIndex((o) => o._id === course._id),
        1
      );
    });
  }
}
