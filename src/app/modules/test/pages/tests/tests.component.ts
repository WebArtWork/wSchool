import { Component } from "@angular/core";
import { AlertService, CoreService } from "wacom";
import { TestService, Test } from "../../services/test.service";
import { FormService } from "src/app/core/modules/form/form.service";
import { TranslateService } from "src/app/core/modules/translate/translate.service";
import { FormInterface } from "src/app/core/modules/form/interfaces/form.interface";

@Component({
  templateUrl: "./tests.component.html",
  styleUrls: ["./tests.component.scss"],
})
export class TestsComponent {
  columns = ["name", "description"];

  form: FormInterface = this._form.getForm("tests", {
    formId: "tests",
    title: "Tests",
    components: [
      {
        name: "Text",
        key: "name",
        focused: true,
        fields: [
          {
            name: "Placeholder",
            value: "fill tests title",
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
            value: "fill tests description",
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
      this._form.modal<Test>(this.form, {
        label: "Create",
        click: (created: unknown, close: () => void) => {
          this._st.create(created as Test);
          close();
        },
      });
    },
    update: (doc: Test) => {
      this._form
        .modal<Test>(this.form, [], doc)
        .then((updated: Test) => {
          this._core.copy(updated, doc);
          this._st.update(doc);
        });
    },
    delete: (doc: Test) => {
      this._alert.question({
        text: this._translate.translate(
          "Common.Are you sure you want to delete this Test?"
        ),
        buttons: [
          {
            text: this._translate.translate("Common.No"),
          },
          {
            text: this._translate.translate("Common.Yes"),
            callback: () => {
              this._st.delete(doc);
            },
          },
        ],
      });
    },
    buttons: [
      {
        icon: "cloud_download",
        click: (doc: Test) => {
          this._form.modalUnique<Test>("tests", "url", doc);
        },
      },
    ],
  };

  get rows(): Test[] {
    return this._st.tests;
  }

  constructor(
    private _translate: TranslateService,
    private _alert: AlertService,
    private _st: TestService,
    private _form: FormService,
    private _core: CoreService
  ) {}
}
