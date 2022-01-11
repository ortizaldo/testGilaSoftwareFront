import { HttpClient } from "@angular/common/http";
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbCalendar } from "@ng-bootstrap/ng-bootstrap";
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";
import { forkJoin } from "rxjs";
import { map } from "rxjs/operators";
import { Alerts } from "services/alerts/alerts.service";
import { ApiResponses } from "services/api-responses/api-responses.service";
import { HttpService } from "services/http/http.service";
import * as _ from "underscore";
import { UtilitiesService } from "services/utilities/utilities.service";

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
    // private translator: TranslateService,
    private httpService: HttpService<any>,
    private alerts: Alerts,
    private router: Router,
    private cd: ChangeDetectorRef,
    private utilities: UtilitiesService,
    private calendar: NgbCalendar,
    private http: HttpClient,
    private location: Location,
    private apiResponsesService: ApiResponses,
    private toastr: ToastrService
  ) {}
	ngOnInit() {
		this.getTCatalogs();
	}

  getTCatalogs() {
    const dictonary: any = {};

    dictonary.cars = this.httpService.getMany("/car/all");

    if (!_.isEmpty(dictonary)) {
      const subscriber = forkJoin(dictonary);

      subscriber.pipe(map((c: any) => c)).subscribe(
				(_data: any) => {
					console.log('%ccar.component.ts line:55 _data', 'color: #007acc;', _data);
				},
        (err) => {
          // const response = this.apiResponsesService.data(err);
          // this.alerts.error(response.title, response.message);
        }
      );
    }
  }
}
