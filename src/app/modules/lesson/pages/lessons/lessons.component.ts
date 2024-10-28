import { Component } from "@angular/core";
import { AlertService, CoreService } from "wacom";
import { LessonService, Lesson } from "../../services/lesson.service";
import { FormService } from "src/app/core/modules/form/form.service";
import { TranslateService } from "src/app/core/modules/translate/translate.service";
import { FormInterface } from "src/app/core/modules/form/interfaces/form.interface";

@Component({
  templateUrl: "./lessons.component.html",
  styleUrls: ["./lessons.component.scss"],
})
export class LessonsComponent {
  columns = ["name", "description"];

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
    ],
  });

  config = {
    create: () => {
      this._form.modal<Lesson>(this.form, {
        label: "Create",
        click: (created: unknown, close: () => void) => {
          this._sl.create(created as Lesson);
          close();
        },
      });
    },
    update: (doc: Lesson) => {
      this._form
        .modal<Lesson>(this.form, [], doc)
        .then((updated: Lesson) => {
          this._core.copy(updated, doc);
          this._sl.update(doc);
        });
    },
    delete: (doc: Lesson) => {
      this._alert.question({
        text: this._translate.translate(
          "Common.Are you sure you want to delete this Lesson?"
        ),
        buttons: [
          {
            text: this._translate.translate("Common.No"),
          },
          {
            text: this._translate.translate("Common.Yes"),
            callback: () => {
              this._sl.delete(doc);
            },
          },
        ],
      });
    },
    buttons: [
      {
        icon: "cloud_download",
        click: (doc: Lesson) => {
          this._form.modalUnique<Lesson>("lessons", "url", doc);
        },
      },
    ],
  };

  get rows(): Lesson[] {
    return this._sl.lessons;
  }

  constructor(
    private _translate: TranslateService,
    private _alert: AlertService,
    private _sl: LessonService,
    private _form: FormService,
    private _core: CoreService
  ) {}
}
