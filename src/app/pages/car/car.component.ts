import { HttpClient } from "@angular/common/http";
import { ChangeDetectorRef, Component, Injector, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbCalendar, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TranslateService } from "@ngx-translate/core";
import { Alerts } from "@services/alerts/alerts.service";
import { ApiResponses } from "@services/api-responses/api-responses.service";
import { FormCarEditComponent } from "components/form-car/form-car-edit/form-car-edit.component";
import { ModalContentComponent } from "components/modal-content/modal-content/modal-content.component";
import { forkJoin } from "rxjs";
import { map } from "rxjs/operators";
import { HttpService } from "services/http/http.service";
import * as _ from "underscore";

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: "car-cmp",
  moduleId: module.id,
  templateUrl: "car.component.html",
})
export class CarComponent implements OnInit {
	cars: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private alerts: Alerts,
    private apiResponsesService: ApiResponses,
    private injector: Injector,
    private modalService: NgbModal,
    private httpService: HttpService<any>,
  ) {}
	ngOnInit() {
		this.getTCatalogs();
	}

  getTCatalogs() {
    const dictonary: any = {};

    dictonary.cars = this.httpService.getMany("car/all");

    if (!_.isEmpty(dictonary)) {
      const subscriber = forkJoin(dictonary);

      subscriber.pipe(map((c: any) => c)).subscribe(
				(_data: any) => {
          this.cars = _data.cars.data;
				},
        (err) => {
          const response = this.apiResponsesService.data(err);
          this.alerts.error(response.title, response.message);
        }
      );
    }
  }

  onAdd() {
    const modalRef = this.modalService.open(ModalContentComponent, {
      size: "lg",
      backdrop: "static",
      injector: Injector.create({
        parent: this.injector,
        providers: [
          {
            provide: "contentComponent",
            useValue: FormCarEditComponent,
          },
          {
            provide: "contentData",
            useValue: {
              data: null,
              isModal: true,
            },
          },
        ],
      }),
    });
    modalRef.componentInstance.title = "car.headingNew";
    modalRef.result.then(
      (result) => {
        // this.clearSelection();
        // this.refresh();
      },
      () => {
        // this.clearSelection();
      }
    );
  }
}
