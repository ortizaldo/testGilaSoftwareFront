import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { Alerts } from "./alerts/alerts.service";
import { ApiResponses } from "./api-responses/api-responses.service";
import { HttpService } from "./http/http.service";
import { UtilitiesService } from "./utilities/utilities.service";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [
    Alerts,
    ApiResponses,
    HttpService,
    UtilitiesService,
  ],
})
export class ServicesModule { }
