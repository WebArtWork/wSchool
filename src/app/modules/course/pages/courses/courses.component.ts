import { Component } from "@angular/core";
import { AlertService, CoreService } from "wacom";
import { CourseService, Course } from "../../services/course.service";
import { FormService } from "src/app/core/modules/form/form.service";
import { TranslateService } from "src/app/core/modules/translate/translate.service";
import { FormInterface } from "src/app/core/modules/form/interfaces/form.interface";

@Component({
  templateUrl: "./courses.component.html",
  styleUrls: ["./courses.component.scss"],
})
export class CoursesComponent {
  columns = ["name", "description"];

  form: FormInterface = this._form.getForm("courses", {
    formId: "courses",
    title: "Courses",
    components: [
      {
        name: "Text",
        key: "name",
        focused: true,
        fields: [
          {
            name: "Placeholder",
            value: "fill courses title",
          },
          {
            name: "Label",
            value: "Title",
          },
        ],
      },
      {
        name: "Text",
        key: "description",
        fields: [
          {
            name: "Placeholder",
            value: "fill courses description",
          },
          {
            name: "Label",
            value: "Description",
          },
        ],
      },
    ],
  });

  config = {
    create: () => {
      this._form.modal<Course>(this.form, {
        label: "Create",
        click: (created: unknown, close: () => void) => {
          this._sc.create(created as Course);
          close();
        },
      });
    },
    update: (doc: Course) => {
      this._form
        .modal<Course>(this.form, [], doc)
        .then((updated: Course) => {
          this._core.copy(updated, doc);
          this._sc.update(doc);
        });
    },
    delete: (doc: Course) => {
      this._alert.question({
        text: this._translate.translate(
          "Common.Are you sure you want to delete this Course?"
        ),
        buttons: [
          {
            text: this._translate.translate("Common.No"),
          },
          {
            text: this._translate.translate("Common.Yes"),
            callback: () => {
              this._sc.delete(doc);
            },
          },
        ],
      });
    },
    buttons: [
      {
        icon: "cloud_download",
        click: (doc: Course) => {
          this._form.modalUnique<Course>("courses", "url", doc);
        },
      },
    ],
  };

  get rows(): Course[] {
    return this._sc.courses;
  }

  constructor(
    private _translate: TranslateService,
    private _alert: AlertService,
    private _sc: CourseService,
    private _form: FormService,
    private _core: CoreService
  ) {}
}
