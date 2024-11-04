import { Component } from "@angular/core";
import { AlertService, CoreService } from "wacom";
import { SchoolcertificateService, Schoolcertificate } from "../../services/schoolcertificate.service";
import { FormService } from "src/app/core/modules/form/form.service";
import { TranslateService } from "src/app/core/modules/translate/translate.service";
import { FormInterface } from "src/app/core/modules/form/interfaces/form.interface";
import { Router } from "@angular/router";

@Component({
  templateUrl: "./certificates.component.html",
  styleUrls: ["./certificates.component.scss"],
})
export class CertificatesComponent {
  columns = ["title", "received", "grade", "expired", "status", "data"];

  moduleType = this._router.url.split('/')[2];
  moduleId = this._router.url.split('/')[3];

  form: FormInterface = this._form.getForm("certificates", {
    formId: "certificates",
    title: "Certificates",
    components: [
      {
        name: "Text",
        key: "title",
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
        name: "Date",
        key: "received",
        fields: [
          {
            name: "Placeholder",
            value: "set receiving date",
          },
          {
            name: "Label",
            value: "Received",
          },
        ],
      },
      {
        name: "Number",
        key: "grade",
        fields: [
          {
            name: "Placeholder",
            value: "set certificates grade",
          },
          {
            name: "Label",
            value: "Grade",
          },
        ],
      },
      {
        name: "Date",
        key: "expired",
        fields: [
          {
            name: "Placeholder",
            value: "set expiration date",
          },
          {
            name: "Label",
            value: "Expired",
          },
        ],
      },
      {
        name: "Select",
        key: "status",
        fields: [
          {
            name: "Items",
            value: ['Pending', 'Received', 'Expired'],
          },
          {
            name: "Placeholder",
            value: "choose certificates status",
          },
          {
            name: "Label",
            value: "Status",
          },
          {
						name: 'Multiple',
						value: false
					}
        ],
      },
    ],
  });

  config = {
    create: () => {
      this._form.modal<Schoolcertificate>(this.form, {
        label: "Create",
        click: (created: unknown, close: () => void) => {
          if (this.moduleId) {
            (created as Schoolcertificate).moduleType = this.moduleType;
            (created as Schoolcertificate).moduleId = this.moduleId;
          }
          this._ss.create(created as Schoolcertificate);
          close();
        },
      });
    },
    update: (doc: Schoolcertificate) => {
      this._form
        .modal<Schoolcertificate>(this.form, [], doc)
        .then((updated: Schoolcertificate) => {
          this._core.copy(updated, doc);
          this._ss.update(doc);
        });
    },
    delete: (doc: Schoolcertificate) => {
      this._alert.question({
        text: this._translate.translate(
          "Common.Are you sure you want to delete this Schoolcertificate?"
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
        click: (doc: Schoolcertificate) => {
          this._form.modalUnique<Schoolcertificate>("certificates", "url", doc);
        },
      },
    ],
  };

  get rows(): Schoolcertificate[] {
    return this.moduleId
    ?this._ss.certificatesByModuleId[this.moduleId] || []
    :this._ss.schoolcertificates;
  }

  constructor(
    private _translate: TranslateService,
    private _alert: AlertService,
    private _ss: SchoolcertificateService,
    private _form: FormService,
    private _core: CoreService,
    private _router: Router
  ) {}
}
