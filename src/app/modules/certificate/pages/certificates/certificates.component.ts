import { Component } from "@angular/core";
import { AlertService, CoreService } from "wacom";
import { CertificateService, Certificate } from "../../services/certificate.service";
import { FormService } from "src/app/core/modules/form/form.service";
import { TranslateService } from "src/app/core/modules/translate/translate.service";
import { FormInterface } from "src/app/core/modules/form/interfaces/form.interface";

@Component({
  templateUrl: "./certificates.component.html",
  styleUrls: ["./certificates.component.scss"],
})
export class CertificatesComponent {
  columns = ["name", "description"];

  form: FormInterface = this._form.getForm("certificates", {
    formId: "certificates",
    title: "Certificates",
    components: [
      {
        name: "Text",
        key: "name",
        focused: true,
        fields: [
          {
            name: "Placeholder",
            value: "fill certificates title",
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
            value: "fill certificates description",
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
      this._form.modal<Certificate>(this.form, {
        label: "Create",
        click: (created: unknown, close: () => void) => {
          this._sc.create(created as Certificate);
          close();
        },
      });
    },
    update: (doc: Certificate) => {
      this._form
        .modal<Certificate>(this.form, [], doc)
        .then((updated: Certificate) => {
          this._core.copy(updated, doc);
          this._sc.update(doc);
        });
    },
    delete: (doc: Certificate) => {
      this._alert.question({
        text: this._translate.translate(
          "Common.Are you sure you want to delete this Certificate?"
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
        click: (doc: Certificate) => {
          this._form.modalUnique<Certificate>("certificates", "url", doc);
        },
      },
    ],
  };

  get rows(): Certificate[] {
    return this._sc.certificates;
  }

  constructor(
    private _translate: TranslateService,
    private _alert: AlertService,
    private _sc: CertificateService,
    private _form: FormService,
    private _core: CoreService
  ) {}
}
