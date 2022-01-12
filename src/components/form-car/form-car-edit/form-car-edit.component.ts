import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { TranslateService } from "@ngx-translate/core";
import { Alerts } from "@services/alerts/alerts.service";
import { ApiResponses } from "@services/api-responses/api-responses.service";
import { HttpService } from "@services/http/http.service";
import { UtilitiesService } from "@services/utilities/utilities.service";
import { ErrorMessage, FormValidationDirective } from "ng-bootstrap-form-validation";
import * as _ from "underscore";
import { forkJoin } from "rxjs";
import { map } from "rxjs/operators";
@Component({
  selector: "app-form-car-edit",
  templateUrl: "./form-car-edit.component.html",
  styleUrls: ["./form-car-edit.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class FormCarEditComponent implements OnInit {
  // @ViewChild(FormValidationDirective, { static: true }) formValidationDirective: FormValidationDirective;

  @ViewChild("htmlForm") htmlFormRef: HTMLFormElement;
  @Input() data: any;
  @Input() _id: any;
  @Output() validSubmit = new EventEmitter();

  formGroup: FormGroup;


  closeResult: string;

  title: string;

  isNew: boolean;

  loading = true;

  endpoint: string;
  customErrorMessages: ErrorMessage[] = [
    {
      error: "required",
      format: (label, error) => this.translator.instant("customErrors.required", {
        value: label,
      }),
    },
    {
      error: "isEmail",
      format: (label, error) => this.translator.instant("customErrors.email", {
        value: label,
      }),
    },
    {
      error: "pattern",
      format: (label, error) => this.translator.instant("customErrors.invalidMask", {
        value: label,
      }),
    },
    {
      error: "rfc",
      format: (label, error) => this.translator.instant("customErrors.rfc"),
    },
    {
      error: "Mask error",
      format: () => this.translator.instant("customErrors.invalidMask"),
    },
  ];

  settingsSelect: any = {};

  optionsSelect: any = {};

  selectedValue: any = {};

  isEdit: boolean;
  constructor(
    private translator: TranslateService,
    private formBuilder: FormBuilder,
    private httpService: HttpService<any>,
    private apiResponsesService: ApiResponses,
    public activeModal: NgbActiveModal,
    private alerts: Alerts,
    private utilities: UtilitiesService
  ) {}

  ngOnInit() {
    if (this.data) {
      if (this.data._id) {
        this.isEdit = true;
      }
    } else {
      this.data = {};
    }

    this.initialize(this.data);
  }

  initialize(data: any) {
    console.log('%cform-car-edit.component.ts line:100 this', 'color: #007acc;', this);
    this.createForm();
    if (this._id) {
      this.initData();
    } else {
      this.loading = true;
      if (this.data) {
        this.formGroup.patchValue(this.data);
      }
    }
  }

  initData() {
    const dictonary: any = {};

    dictonary.cars = this.httpService.getMany("car/" + this._id);

    if (!_.isEmpty(dictonary)) {
      const subscriber = forkJoin(dictonary);

      subscriber.pipe(map((c: any) => c)).subscribe(
        (_data: any) => {
          console.log('🚀 ~ FormCarEditComponent ~ initData ~ _data', _data.cars.data);
          this.formGroup.patchValue(_data.cars.data);
          this.loading = true;
          // this.cars = _data.cars.data;
				},
        (err) => {
          const response = this.apiResponsesService.data(err);
          this.alerts.error(response.title, response.message);
        }
      );
    }
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      carName: new FormControl("", {
        validators: [Validators.required],
      }),
      typeCar: new FormControl(""),
      reels: new FormControl("", {
        validators: [Validators.required],
      }),
      enginePower: new FormControl("", {
        validators: [Validators.required],
      }),
      motor: new FormControl("", {
        validators: [Validators.required],
      }),
      color: new FormControl("", {
        validators: [Validators.required],
      }),
    });
  }

  sendData() {
    this.activeModal.close(this.formGroup);
  }

  updateModel(event: any, key: string) {
    const keys = key.split(".");
    if (keys.length > 1) {
      const k = keys.splice(-1, 1);
      const group = this.formGroup.get(keys);
      group.patchValue({
        [k[0]]: event._id || event.id || event,
      });
    } else {
      this.formGroup.patchValue({
        [key]: event._id || event.id || event,
      });
    }
  }
}
