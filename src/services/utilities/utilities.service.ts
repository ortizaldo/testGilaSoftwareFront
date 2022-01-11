import { Injectable } from "@angular/core";
import { FormArray } from "@angular/forms";
import { NgbDate } from "@ng-bootstrap/ng-bootstrap";
import { TranslateService } from "@ngx-translate/core";
import * as _ from "lodash";
import * as _under from "underscore";
import { MaskService } from "ngx-mask";

@Injectable({
  providedIn: "root",
})

/**
 * Class UtilitiesService
 * @description Service for some utilities that could be used accross the app
 */
export class UtilitiesService {
  /**
   * Global var: phoneRegexp. Used for standar phone number validation (123-456-7890)
   * @var {RegExp} phoneRegexp
   */
  phoneRegexp: RegExp;
  phoneRegexp_dos: RegExp;

  /**
   * Global var: postalCodeRegexp. Used for standar postal code number validation (12345)
   * @var {RegExp} postalCodeRegexp
   */
  postalCodeRegexp: RegExp;

  ediValues: any[];

  constructor(
    private translator: TranslateService,
    private maskService: MaskService
  ) {
    this.phoneRegexp = /^\d{3}-\d{3}-\d{4}$/;
    this.phoneRegexp_dos = /^\d{3}-\d{3}-\d{4}$/;
    this.postalCodeRegexp = /^\d{5}$/;
    this.ediValues = [];
  }

  /**
   * @function arrayToggler
   * @param {[]} array
   * @param {string} item
   * @description Function will find an item inside array, and will add it or removed according to existence of item in array
   */
  arrayToggler(array, item) {
    const index = array.indexOf(item);
    if (index !== -1) {
      array.splice(index, 1);
    } else {
      array.push(item);
    }
  }

  /**
   * @function nestedFieldVal
   * @description Pass and object and the desired field as a string with dots, and return the value
   */
  nestedFieldVal(object, column) {
    let fieldName: string = column.field || column.displayField || column.fieldName || "";
    let field = fieldName.replace(/\[(\w+)\]/g, ".$1");
    field = field.replace(/^\./, "");
    const a = field.split(".");
    try {
      for (let i = 0, n = a.length; i < n; i++) {
        const k = a[i];
        if (object && k in object) {
          object = object[k];
        } else {
          return "";
        }
      }
    } catch (err) {
      return object[field];
    }
    if (["disabled"].indexOf(field) >= 0) {
      return this.translator.instant("app.catalogs.yesNo." + (object ? "no" : "yes"));
    }
    if (["active"].indexOf(field) >= 0) {
      return this.translator.instant("app.catalogs.yesNo." + (object ? "yes" : "no"));
    }
    if (["phone"].indexOf(field) >= 0) {
      return this.maskService.applyMask(object, "(000) 000-0000");
    }
    return object;
  }

  /**
   * @function delEl
   * @description Removes an element based on its index from a FormArray.
   * @param {FormArray} arr
   * @param {number} index
   */
  delEl(arr: FormArray, index: number) {
    arr.removeAt(index);
  }

  /**
   * @function getHierarchy
   * @description Find and returns the hierarchy of the item according to it's ID
   * @param {string} id
   * @param {any[]} arr
   * @returns {number}
   */
  getHierarchy(id: string, arr: any[]) {
    const el = arr.filter((item) => item._id === id);
    return el[0].hierarchy;
  }

  formatNumber(val: number, decimals: number) {
    if (!val) {
      return "0.00";
    }
    if (typeof val === "string") {
      return val;
    }
    return val.toFixed(decimals);
  }

  jsonFind(obj, fields) {
    const values = [];
    this.ediValues = [];
    fields.forEach(() => {
      values.push([]);
    });
    if (typeof obj === "object") {
      this.repeater(obj, fields, values);
    } else {
      obj.forEach((item) => {
        this.repeater(item, fields, values);
      });
    }
    return values;
  }

  repeater(obj, fields, values) {
    Object.keys(obj).forEach((key) => {
      if (Array.isArray(obj[key])) {
        fields.forEach((field, index) => {
          if (key.includes(field)) {
            values[index].push(obj[key]);
          }
        });
        obj[key].forEach((subObj) => {
          this.repeater(subObj, fields, values);
        });
        return;
      }
      if (typeof obj[key] === "object") {
        fields.forEach((field, index) => {
          if (key.includes(field)) {
            values[index].push(obj);
          }
        });
        this.repeater(obj[key], fields, values);
        return;
      }
      fields.forEach((field, index) => {
        if (key.includes(field)) {
          values[index].push(obj[key]);
        }
      });
    });
  }

  toInt(value) {
    if (/^[-+]?(\d+|Infinity)$/.test(value)) {
      return Number(value);
    } else {
      return NaN;
    }
  }

  isIpAddress(ip) {
    // tslint:disable-next-line: max-line-length
    if (
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
        ip
      )
    ) {
      return true;
    }
    return false;
  }

  beetween(value, min, max) {
    return value >= min && value <= max;
  }

  isStringNotEmpty(text: string) {
    return text !== null && text !== undefined && text.length > 0;
  }

  findByAttr(collection: any, key: string, value: any) {
    if (_under.isObject(collection)) {
      return collection.find((item: any) => {
        // console.log(key, item[key], value);
        if (item[key] === value) {
          return item;
        }
        return null;
      });
    } else {
      return null;
    }
  }

  searchByIdx(value: any, collection: any[], key: string = "id", label: string = "text") {
    let result: any;
    result = _.find(collection, { [key]: value });
    return result ? result[label] : "";
  }
}
