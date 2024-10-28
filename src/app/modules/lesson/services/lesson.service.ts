import { Injectable } from "@angular/core";
import {
  AlertService,
  CoreService,
  HttpService,
  StoreService,
  CrudService,
  CrudDocument,
} from "wacom";

export interface Lesson extends CrudDocument {
  name: string;
  description: string;
}

@Injectable({
  providedIn: "root",
})
export class LessonService extends CrudService<Lesson> {
  lessons: Lesson[] = [];
  constructor(
    _http: HttpService,
    _store: StoreService,
    _alert: AlertService,
    _core: CoreService
  ) {
    super(
      {
        name: "lesson",
      },
      _http,
      _store,
      _alert,
      _core
    );

    this.get().subscribe((lessons: Lesson[]) => this.lessons.push(...lessons));

    _core.on("lesson_create").subscribe((lesson: Lesson) => {
      this.lessons.push(lesson);
    });

    _core.on("lesson_delete").subscribe((lesson: Lesson) => {
      this.lessons.splice(
        this.lessons.findIndex((o) => o._id === lesson._id),
        1
      );
    });
  }
}
