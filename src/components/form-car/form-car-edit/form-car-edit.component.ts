import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { TranslateService } from "@ngx-translate/core";
import { Alerts } from "@services/alerts/alerts.service";
import { ApiResponses } from "@services/api-responses/api-responses.service";
import { HttpService } from "@services/http/http.service";
import { UtilitiesService } from "@services/utilities/utilities.service";
import { ErrorMessage, FormValidationDirective } from "ng-bootstrap-form-validation";
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
  @Output() validSubmit = new EventEmitter();

  formGroup: FormGroup;


  closeResult: string;

  title: string;

  isNew: boolean;

  loading = true;

  endpoint: string;

  _id: string;

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
    private http: HttpService<any>,
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
    this.createForm();
    if (this.isEdit) {
      this.formGroup.patchValue(this.data);
      this.loading = true;
    } else {
      this.loading = true;
      if (this.data) {
        this.formGroup.patchValue(this.data);
      }
    }
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      carName: new FormControl("", {
        validators: [Validators.required],
      }),
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
