import { Component } from "@angular/core";
import { AlertService, CoreService } from "wacom";
import { SchoollessonService, Schoollesson } from "../../services/schoollesson.service";
import { FormService } from "src/app/core/modules/form/form.service";
import { TranslateService } from "src/app/core/modules/translate/translate.service";
import { FormInterface } from "src/app/core/modules/form/interfaces/form.interface";
import { Router } from "@angular/router";

@Component({
  templateUrl: "./lessons.component.html",
  styleUrls: ["./lessons.component.scss"],
})
export class LessonsComponent {
  columns = ["name", "description", "links", "data"];

  courseId = this._router.url.includes('/lessons/') ? this._router.url.replace('/lessons/', '') : '';

  form: FormInterface = this._form.getForm("lessons", {
    formId: "lessons",
    title: "Lessons",
    components: [
      {
        name: "Text",
        key: "name",
        focused: true,
        fields: [
          {
            name: "Placeholder",
            value: "fill lessons title",
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
            value: "fill lessons description",
          },
          {
            name: "Label",
            value: "Description",
          },
        ],
      },
      {
        name: "Tags",
        key: "links",
        fields: [
          {
            name: "Placeholder",
            value: "add lessons links",
          },
          {
            name: "Label",
            value: "Links",
          },
        ],
      },
    ],
  });

  config = {
    create: () => {
      this._form.modal<Schoollesson>(this.form, {
        label: "Create",
        click: (created: unknown, close: () => void) => {
          if (this.courseId) {
            (created as Schoollesson).schoolcourse = this.courseId;
          }
          this._ss.create(created as Schoollesson);
          close();
        },
      });
    },
    update: (doc: Schoollesson) => {
      this._form
        .modal<Schoollesson>(this.form, [], doc)
        .then((updated: Schoollesson) => {
          this._core.copy(updated, doc);
          this._ss.update(doc);
        });
    },
    delete: (doc: Schoollesson) => {
      this._alert.question({
        text: this._translate.translate(
          "Common.Are you sure you want to delete this Schoollesson?"
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
        click: (doc: Schoollesson) => {
          this._form.modalUnique<Schoollesson>("lessons", "url", doc);
        },
      },
      {
				icon: 'assignment',
				hrefFunc: (doc: Schoollesson) => '/tests/lessons/' + doc._id
			}
    ],
  };

  get rows(): Schoollesson[] {
    return this.courseId
    ?this._ss.lessonsByCourseId[this.courseId] || []
    :this._ss.schoollessons;
  }

  constructor(
    private _translate: TranslateService,
    private _alert: AlertService,
    private _ss: SchoollessonService,
    private _form: FormService,
    private _core: CoreService,
    private _router: Router
  ) {}
}
