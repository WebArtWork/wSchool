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

export interface Schoolcourse extends CrudDocument {
  name: string;
  description: string;
  school: string;
  duration: number;
  cost: number;
}

@Injectable({
  providedIn: "root",
})
export class SchoolcourseService extends CrudService<Schoolcourse> {
  _helper = inject(HelperService)

  schoolcourses: Schoolcourse[] = [];

  coursesBySchoolId: Record<string, Schoolcourse[]> = {}
  setCoursesBySchoolId = this._helper.createParentIdToChildrenIds<Schoolcourse[]>(this.coursesBySchoolId, this.schoolcourses, 'school')

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

    this.get().subscribe((schoolcourses: Schoolcourse[]) => {
      this.schoolcourses.push(...schoolcourses)

      this.setCoursesBySchoolId()
    });

    _core.on("schoolcourse_create").subscribe((schoolcourse: Schoolcourse) => {
      this.schoolcourses.push(schoolcourse);

      this.setCoursesBySchoolId()
    });

    _core.on("schoolcourse_delete").subscribe((schoolcourse: Schoolcourse) => {
      this.schoolcourses.splice(
        this.schoolcourses.findIndex((o) => o._id === schoolcourse._id),
        1
      );

      this.setCoursesBySchoolId()
    });
  }
}
