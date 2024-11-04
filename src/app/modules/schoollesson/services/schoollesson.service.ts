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

export interface Schoollesson extends CrudDocument {
  name: string;
  description: string;
  schoolcourse: string;
  links: [string];
}

@Injectable({
  providedIn: "root",
})
export class SchoollessonService extends CrudService<Schoollesson> {
  _helper = inject(HelperService)

  schoollessons: Schoollesson[] = [];

  lessonsByCourseId: Record<string, Schoollesson[]> = {}
  setLessonsByCourseId = this._helper.createParentIdToChildrenIds<Schoollesson[]>(this.lessonsByCourseId, this.schoollessons, 'schoolcourse')
  
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

    this.get().subscribe((schoollessons: Schoollesson[]) => {
      this.schoollessons.push(...schoollessons)

      this.setLessonsByCourseId()
    });

    _core.on("schoollesson_create").subscribe((schoollesson: Schoollesson) => {
      this.schoollessons.push(schoollesson);

      this.setLessonsByCourseId()
    });

    _core.on("schoollesson_delete").subscribe((schoollesson: Schoollesson) => {
      this.schoollessons.splice(
        this.schoollessons.findIndex((o) => o._id === schoollesson._id),
        1
      );

      this.setLessonsByCourseId()
    });
  }
}
