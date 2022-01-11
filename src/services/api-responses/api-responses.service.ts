import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { environment } from "../../environments/environment";
import * as _ from "underscore";

@Injectable({
  providedIn: "root",
})

/**
 * Class ApiResponses
 * @description Servicio para manejar las respuestas del API.
 */
export class ApiResponses {
  constructor(private translator: TranslateService) {}

  /**
   * @function data
   * @description Según el código enviado por el API regresa el título y mensaje correspondiente.
   * @return {title: string, message: string} Objeto con los datos procesados.
   */
  data(_response: any): { title: string; message: string } {
    let dataResponse = {
      title: this.translator.instant("api.response.default.title"),
      message: this.translator.instant("api.response.default.message"),
    };

    let response: any;

    if (_.has(_response.error, "data")) {
      response = _response.error.data;
    } else {
      response = _response;
    }

    if (response.code && response.code === 101) {
      dataResponse.title = this.translator.instant(`api.response.code.${response.code}.title`);
      dataResponse.message = this.translator.instant(`api.response.code.${response.code}.message`, {
        minutes: response.timeRemaining,
      });
    } else if (response.code && (response.code === 109 || response.code === 112)) {
      dataResponse.title = this.translator.instant(`api.response.code.${response.code}.title`);
      dataResponse.message = this.translator.instant(`api.response.code.${response.code}.message`, {
        minLength: environment.password.minLength,
      });
    } else if (response.code) {
      dataResponse.title = this.translator.instant(`api.response.code.${response.code}.title`);
      dataResponse.message = this.translator.instant(`api.response.code.${response.code}.message`);
    }

    return dataResponse;
  }
}
