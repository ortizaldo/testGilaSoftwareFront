import swal from "sweetalert2";
import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: "root",
})

/**
 * Class Alerts
 *
 * @description Class for alerts service
 */
export class Alerts {
  activeUrl: string;

  constructor(private translator: TranslateService, private router: Router, private toastr: ToastrService) {}

  /**
   * @function success
   * @param  {string} title
   * @param  {string} text
   * @description Returns a success sweet alert element
   */
  success(title: string, text: string, html: string = "") {
    return swal({
      title,
      text,
      type: "success",
      confirmButtonText: this.translator.instant("app.buttons.ok"),
      html,
      cancelButtonClass: "btn btn-danger",
      confirmButtonClass: "btn btn-info",
      buttonsStyling: false,
      reverseButtons: false,
    });
  }

  successSimple(title: string, callbackClose: any) {
    this.html(
      title,
      null,
      null,
      `<br>
        <div class="row justify-content-between">
        <div class="col-1"></div>
        <div class="col-10">
        <button class="btn btn-info" id="btnClose">
        Ok
        </button>
        </div>
        <div class="col-1"></div>
        </div>`,
      false,
      false,
      null,
      null,
      null,
      false,
      true,
      "success",
      null,
      async () => {
        const content = swal.getContent();
        const $ = content.querySelector.bind(content);
        const btnClose = $("#btnClose");
        const btnNew = $("#btnNew");
        const btnView = $("#btnView");

        btnClose.addEventListener("click", () => {
          callbackClose();
          swal.close();
        });
      }
    );
  }

  /**
   * @function error
   * @param  {string='Error'} title
   * @param  {string='Pleasetryagain'} text
   * @description Returns an error sweet alert element
   */
  error(title: string = "Error", text: string = "Por favor, intenta de nuevo") {
    return swal({
      title,
      text,
      type: "error",
      confirmButtonText: this.translator.instant("app.buttons.ok"),
      cancelButtonClass: "btn btn-danger",
      confirmButtonClass: "btn btn-info",
      buttonsStyling: false,
      reverseButtons: false,
    });
  }

  /**
   *
   * @param {string} title Title for the alert
   * @param {string} text Subtitle? Secondary text for the alert
   * @param `
   * {'number' | 'text' | 'email'
   * |'password' | 'tel' | 'range' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'file' | 'url'}
   * input Input type`
   * @param {any} inputAttributes HTML attribute to add to the input. Should be and object
   * @param {boolean} showCancelButton Can alert be cancelled?
   * @param {string} confirmButtonText Text to display in 'Confirm button'
   * @param {boolean} showLoaderOnConfirm If AJAX request, could be good to display the loader. Want to?
   * @param {any} preConfirm Function to run after click 'Confirm button'
   * @param {boolean} allowOutsideClick Can click outside to close the alert?
   * @param {string} title2 Title for secondary alert. The one returned after the preConfirm fn
   * @param {string} text2 Subtitle? Secondary text for secondary alert. The one returned after the preConfirm fn
   * @param {string} cancelButtonText Text to display in the 'Cancel button'.
   * This is not the 'Cancel' action in your app, it means, 'Cancel the alert, I won't continue'
   */
  input(
    title: string,
    text: string,
    input: any,
    inputAttributes: any,
    showCancelButton: boolean,
    confirmButtonText: string,
    showLoaderOnConfirm: boolean,
    preConfirm: any,
    allowOutsideClick: boolean,
    title2: string,
    text2: string,
    cancelButtonText: string = "Cancelar"
  ) {
    return swal({
      title,
      text,
      input,
      inputAttributes,
      showCancelButton,
      confirmButtonText,
      showLoaderOnConfirm,
      cancelButtonText,
      preConfirm,
      allowOutsideClick,
      inputValidator: (value) => !value && "No se permiten campos vacíos",
      reverseButtons: false,
      cancelButtonClass: "btn btn-danger",
      confirmButtonClass: "btn btn-info",
      buttonsStyling: false,
    })
      .then((result) => {
        if (result.value) {
          return swal({
            title: title2,
            text: text2,
            type: "success",
          });
        }
      })
      .catch((err) =>
        swal({
          title: err.title,
          text: err.message,
          type: "error",
        })
      );
  }

  html(
    title: string,
    title2: string,
    text2: string,
    html: any,
    showConfirmButton: boolean,
    showCancelButton: boolean,
    confirmButtonText: string = this.translator.instant("app.buttons.ok"),
    cancelButtonText: string = this.translator.instant("app.buttons.cancel"),
    okButtonText: string = this.translator.instant("app.buttons.cancel"),
    allowOutsideClick: boolean,
    showLoaderOnConfirm: boolean,
    type: any,
    preConfirm?: any,
    onBeforeOpen?: any
  ) {
    return swal({
      title,
      html,
      showConfirmButton,
      showCancelButton,
      confirmButtonText,
      cancelButtonText,
      allowOutsideClick,
      showLoaderOnConfirm,
      preConfirm,
      onBeforeOpen,
      cancelButtonClass: "btn btn-danger",
      confirmButtonClass: "btn btn-info",
      buttonsStyling: false,
      reverseButtons: false,
      type,
    })
      .then((result) => {
        if (result.value && title2 !== "") {
          return swal({
            title: title2,
            text: text2,
          });
        }
      })
      .catch((err) =>
        swal({
          title: err.title,
          text: err.message,
        }).then(() => {
          this.html(
            title,
            title2,
            text2,
            html,
            showConfirmButton,
            showCancelButton,
            confirmButtonText,
            cancelButtonText,
            okButtonText,
            allowOutsideClick,
            showLoaderOnConfirm,
            type,
            preConfirm,
            onBeforeOpen
          );
        })
      );
  }

  confirmation(title: string, text: string, cancelButtonText: string, confirmButtonText: string = "OK") {
    return swal({
      title,
      text,
      cancelButtonText,
      confirmButtonText,
      type: "warning",
      reverseButtons: false,
      buttonsStyling: false,
      showCancelButton: true,
      cancelButtonClass: "btn btn-danger",
      confirmButtonClass: "btn btn-info",
    });
  }

  successNotification(message: any, position: any, title?: string) {
    this.toastr.success(message, this.translator.instant(title || "app.recordCreated"), {
      timeOut: 4000,
      closeButton: true,
      enableHtml: true,
      positionClass: position,
    });
  }

  errorNotification(message: any, position: any, title?: string, interpolateParams?: any) {
    this.toastr.error(
      this.translator.instant(message, interpolateParams),
      title ? this.translator.instant(title) : "",
      {
        timeOut: 4000,
        closeButton: true,
        enableHtml: true,
        positionClass: position,
      }
    );
  }

  simpleNotification(message: any, classNotification: any, position: any) {
    // "alert alert-danger alert-with-icon"
    // "toast-top-right"
    this.toastr.info(message, "<span class=\"now-ui-icons ui-1_bell-53\"></span>", {
      // timeOut: 4000,
      disableTimeOut: true,
      closeButton: true,
      enableHtml: true,
      toastClass: classNotification,
      positionClass: position,
    });
  }
}
