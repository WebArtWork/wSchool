import { Component } from "@angular/core";
import { AlertService, CoreService } from "wacom";
import { SchoolService, School } from "../../services/school.service";
import { FormService } from "src/app/core/modules/form/form.service";
import { TranslateService } from "src/app/core/modules/translate/translate.service";
import { FormInterface } from "src/app/core/modules/form/interfaces/form.interface";

@Component({
  templateUrl: "./school.component.html",
  styleUrls: ["./school.component.scss"],
})
export class SchoolComponent {
  columns = ["name", "description"];

  form: FormInterface = this._form.getForm("school", {
    formId: "school",
    title: "School",
    components: [
      {
        name: "Text",
        key: "name",
        focused: true,
        fields: [
          {
            name: "Placeholder",
            value: "fill school title",
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
            value: "fill school description",
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
      this._form.modal<School>(this.form, {
        label: "Create",
        click: (created: unknown, close: () => void) => {
          this._ss.create(created as School);
          close();
        },
      });
    },
    update: (doc: School) => {
      this._form
        .modal<School>(this.form, [], doc)
        .then((updated: School) => {
          this._core.copy(updated, doc);
          this._ss.update(doc);
        });
    },
    delete: (doc: School) => {
      this._alert.question({
        text: this._translate.translate(
          "Common.Are you sure you want to delete this School?"
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
        click: (doc: School) => {
          this._form.modalUnique<School>("school", "url", doc);
        },
      },
    ],
  };

  get rows(): School[] {
    return this._ss.schools;
  }

  constructor(
    private _translate: TranslateService,
    private _alert: AlertService,
    private _ss: SchoolService,
    private _form: FormService,
    private _core: CoreService
  ) {}
}
