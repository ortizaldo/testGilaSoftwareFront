import { HttpClient } from "@angular/common/http";
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbCalendar } from "@ng-bootstrap/ng-bootstrap";
import { TranslateService } from "@ngx-translate/core";
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
          console.log('🚀 ~ CarComponent ~ getTCatalogs ~ this.cars', this.cars);
				},
        (err) => {
          // const response = this.apiResponsesService.data(err);
          // this.alerts.error(response.title, response.message);
        }
      );
    }
  }
}
