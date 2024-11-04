import { Component } from "@angular/core";
import { AlertService, CoreService } from "wacom";
import { SchoolService, School } from "../../services/school.service";
import { FormService } from "src/app/core/modules/form/form.service";
import { TranslateService } from "src/app/core/modules/translate/translate.service";
import { FormInterface } from "src/app/core/modules/form/interfaces/form.interface";

@Component({
  templateUrl: "./schools.component.html",
  styleUrls: ["./schools.component.scss"],
})
export class SchoolsComponent {
  columns = ["name", "description", "address", "phone", "email", "year", "signature", "curency", "type", "data"];

  form: FormInterface = this._form.getForm("schools", {
    formId: "schools",
    title: "Schools",
    components: [
      {
        name: "Text",
        key: "name",
        focused: true,
        fields: [
          {
            name: "Placeholder",
            value: "fill schools title",
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
            value: "fill schools description",
          },
          {
            name: "Label",
            value: "Description",
          },
        ],
      },
      {
        name: "Text",
        key: "address",
        fields: [
          {
            name: "Placeholder",
            value: "fill schools address",
          },
          {
            name: "Label",
            value: "Address",
          },
        ],
      },
      {
        name: "Text",
        key: "phone",
        fields: [
          {
            name: "Placeholder",
            value: "fill schools phone",
          },
          {
            name: "Label",
            value: "Phone",
          },
        ],
      },
      {
        name: "Text",
        key: "email",
        fields: [
          {
            name: "Placeholder",
            value: "fill schools email",
          },
          {
            name: "Label",
            value: "Email",
          },
        ],
      },
      {
        name: "Text",
        key: "year",
        fields: [
          {
            name: "Placeholder",
            value: "fill schools year",
          },
          {
            name: "Label",
            value: "Year",
          },
        ],
      },
      {
        name: "Text",
        key: "signature",
        fields: [
          {
            name: "Placeholder",
            value: "fill schools signature",
          },
          {
            name: "Label",
            value: "Signature",
          },
        ],
      },
      {
        name: "Text",
        key: "curency",
        fields: [
          {
            name: "Placeholder",
            value: "fill schools curency",
          },
          {
            name: "Label",
            value: "Curency",
          },
        ],
      },
      {
        name: "Select",
        key: "type",
        fields: [
          {
            name: "Items",
            value: ['Offline', 'Online'],
          },
          {
            name: "Placeholder",
            value: "choose schools type",
          },
          {
            name: "Label",
            value: "Type",
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
          this._form.modalUnique<School>("schools", "url", doc);
        },
      },
      {
				icon: 'grade',
				hrefFunc: (doc: School) => '/courses/' + doc._id
			},
      {
				icon: 'assignment',
				hrefFunc: (doc: School) => '/tests/schools/' + doc._id
			}
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
