import { Injectable } from "@angular/core";
import { Notification } from "../../data-models/Notification";
import * as jQuery from "jquery";
import "bootstrap-notify";

//declare var $: any;
let $: any = jQuery;

@Injectable({
  providedIn: "root",
})

/**
 * Class Notifications
 * @description Notifications service
 */
export class Notifications {
  constructor() {}
  /**
   * @function createOne
   * @param  {Notification} notification
   * @description Creates a custom notification
   * @return {HTMLElement}
   */
  createOne(notification: Notification) {
    return $.notify(notification.options, notification.settings);
  }

  /**
   * @function error
   * @description Creates a error notification
   * @return {HTMLElement}
   */
  error(message: string, title = "") {
    const options: Notification["options"] = {
      message: message,
      title: title,
    };

    const settings: Notification["settings"] = {
      type: "danger",
    };

    return $.notify(options, settings);
  }
}
