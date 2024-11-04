import { inject, Injectable } from "@angular/core";
import { HelperService } from "src/app/core/services/helper.service";
import {
  AlertService,
  CoreService,
  HttpService,
  StoreService,
  CrudService,
  CrudDocument,
} from "wacom";

export interface Schooltest extends CrudDocument {
  name: string;
  description: string;
  moduleType: string;
  moduleId: string;
  duration: number;
}

@Injectable({
  providedIn: "root",
})
export class SchooltestService extends CrudService<Schooltest> {
  _helper = inject(HelperService)

  schooltests: Schooltest[] = [];

  testsByModuleId: Record<string, Schooltest[]> = {}
  setTestsByModuleId = this._helper.createParentIdToChildrenIds<Schooltest[]>(this.testsByModuleId, this.schooltests, 'moduleId')

  constructor(
    _http: HttpService,
    _store: StoreService,
    _alert: AlertService,
    _core: CoreService
  ) {
    super(
      {
        name: "schooltest",
      },
      _http,
      _store,
      _alert,
      _core
    );

    this.get().subscribe((schooltests: Schooltest[]) => {
      this.schooltests.push(...schooltests)

      this.setTestsByModuleId()
    });

    _core.on("schooltest_create").subscribe((schooltest: Schooltest) => {
      this.schooltests.push(schooltest);

      this.setTestsByModuleId()
    });

    _core.on("schooltest_delete").subscribe((schooltest: Schooltest) => {
      this.schooltests.splice(
        this.schooltests.findIndex((o) => o._id === schooltest._id),
        1
      );

      this.setTestsByModuleId()
    });
  }
}
