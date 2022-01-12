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
    private translator: TranslateService,
    private alerts: Alerts,
    private apiResponsesService: ApiResponses,
    private injector: Injector,
    private modalService: NgbModal,
    private httpService: HttpService<any>,
  ) {}
	ngOnInit() {
		this.refresh();
	}

  refresh() {
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
    const modal = this.openModal();
    modal.componentInstance.title = "car.headingNew";
    modal.result.then(
      (result) => {
        if (!result) {
          return false;
        }
        result.value.typeCar = 3;
        this.save(result.value);
      },
      () => {
        // this.clearSelection();
      }
    );
  }

  onEdit(id: number) {
    const modal = this.openModal(id);
    modal.componentInstance.title = "car.headingEdit";
    modal.result.then(
      (result) => {
        if (!result) {
          return false;
        }
        result.value.idTypeCar = result.value.typeCar;
        console.log('🚀 ~ CarComponent ~ onEdit ~ result.value', result.value);
        this.save(result.value, id);
      },
      () => {
        // this.clearSelection();
      }
    );
  }

  save(data: any, id?: number) {
    if (id) {
      this.httpService.updateOne("car", id, data).subscribe(
        (d: any) => {
          this.handlerSave();
          // this.buttonSpinnerRef.hide();
        },
        (err) => {
          const response = this.apiResponsesService.data(err);
          this.alerts.error(response.title, response.message);
        }
      );
    } else {
      this.httpService.createOne("car", data).subscribe(
      (d: any) => {
        this.handlerSave();
        // this.buttonSpinnerRef.hide();
      },
      (err) => {
        const response = this.apiResponsesService.data(err);
        this.alerts.error(response.title, response.message);
      }
    ); 
    }
  }

  private handlerSave() {
    this.alerts.success(
      this.translator.instant("car.carSavedTitle"),
      "toast-top-right",
      this.translator.instant("car.menu"));
    this.refresh();
  }

  openModal(_id?: number) {
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
              _id: _id,
              isModal: true,
            },
          },
        ],
      }),
    });
    return modalRef;
  }
}
