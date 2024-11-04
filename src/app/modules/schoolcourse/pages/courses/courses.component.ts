import { Component } from "@angular/core";
import { AlertService, CoreService } from "wacom";
import { SchoolcourseService, Schoolcourse } from "../../services/schoolcourse.service";
import { FormService } from "src/app/core/modules/form/form.service";
import { TranslateService } from "src/app/core/modules/translate/translate.service";
import { FormInterface } from "src/app/core/modules/form/interfaces/form.interface";
import { Router } from "@angular/router";

@Component({
  templateUrl: "./courses.component.html",
  styleUrls: ["./courses.component.scss"],
})
export class CoursesComponent {
  columns = ["name", "description"];

  schoolId = this._router.url.includes('/courses/') ? this._router.url.replace('/courses/', '') : '';

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
      this._form.modal<Schoolcourse>(this.form, {
        label: "Create",
        click: (created: unknown, close: () => void) => {
          if (this.schoolId) {
            (created as Schoolcourse).school = this.schoolId;
          }
          this._ss.create(created as Schoolcourse);
          close();
        },
      });
    },
    update: (doc: Schoolcourse) => {
      this._form
        .modal<Schoolcourse>(this.form, [], doc)
        .then((updated: Schoolcourse) => {
          this._core.copy(updated, doc);
          this._ss.update(doc);
        });
    },
    delete: (doc: Schoolcourse) => {
      this._alert.question({
        text: this._translate.translate(
          "Common.Are you sure you want to delete this Schoolcourse?"
        ),
        buttons: [
          {
            text: this._translate.translate("Common.No"),
          },
          {
            text: this._translate.translate("Common.Yes"),
            callback: () => {
              this._ss.delete(doc);
            },
          },
        ],
      });
    },
    buttons: [
      {
        icon: "cloud_download",
        click: (doc: Schoolcourse) => {
          this._form.modalUnique<Schoolcourse>("courses", "url", doc);
        },
      },
      {
        icon: "work",
        hrefFunc: (doc: Schoolcourse) => '/lessons/' + doc._id
      },
      {
				icon: 'assignment',
				hrefFunc: (doc: Schoolcourse) => '/tests/courses/' + doc._id
			},
      {
				icon: 'card_membership',
				hrefFunc: (doc: Schoolcourse) => '/certificates/courses/' + doc._id
			}
    ],
  };

  get rows(): Schoolcourse[] {
    return this.schoolId
    ?this._ss.coursesBySchoolId[this.schoolId] || []
    :this._ss.schoolcourses;
  }

  constructor(
    private _translate: TranslateService,
    private _alert: AlertService,
    private _ss: SchoolcourseService,
    private _form: FormService,
    private _core: CoreService,
    private _router: Router
  ) {}
}
