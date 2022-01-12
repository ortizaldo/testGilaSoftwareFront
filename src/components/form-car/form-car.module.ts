import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { TranslateModule } from "@ngx-translate/core";
import { AngularSvgIconModule } from "angular-svg-icon";
import { NgxMaskModule } from "ngx-mask";
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { FormCarEditComponent } from "./form-car-edit/form-car-edit.component";
import { UtilitiesService } from "@services/utilities/utilities.service";

@NgModule({
  declarations: [FormCarEditComponent],
  imports: [
    CommonModule,
    AngularSvgIconModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule,
    NgbModule,
    NgxMaskModule,
    NgBootstrapFormValidationModule.forRoot()
  ],
  exports: [],
  providers: [UtilitiesService],
})
export class FormCarModule {}
