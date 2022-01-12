import { Inject, Injectable, InjectionToken, Injector, Optional, Type } from "@angular/core";
import { HttpClient, HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

import { ErrorHandlerInterceptor } from "../../interceptors/error-handler.interceptor";
import { ApiPrefixInterceptor } from "interceptors/api-prefix.interceptor";
// import { CacheInterceptor } from './cache.interceptor';

// HttpClient is declared in a re-exported module, so we have to extend the original module to make it work properly
// (see https://github.com/Microsoft/TypeScript/issues/13897)
declare module "@angular/common/http/http" {
  // Augment HttpClient with the added configuration methods from HttpService, to allow in-place replacement of
  // HttpClient with HttpService using dependency injection
  export interface HttpClient {
    /**
     * Enables caching for this request.
     * @param forceUpdate Forces request to be made and updates cache entry.
     * @return The new instance.
     */
    cache(forceUpdate?: boolean): HttpClient;

    /**
     * Skips default error handler for this request.
     * @return The new instance.
     */
    skipErrorHandler(): HttpClient;

    /**
     * Do not use API prefix for this request.
     * @return The new instance.
     */
    disableApiPrefix(): HttpClient;
  }
}

// From @angular/common/http/src/interceptor: allows to chain interceptors
class HttpInterceptorHandler implements HttpHandler {
  constructor(private next: HttpHandler, private interceptor: HttpInterceptor) {}

  handle(request: HttpRequest<any>): Observable<HttpEvent<any>> {
    return this.interceptor.intercept(request, this.next);
  }
}

/**
 * Allows to override default dynamic interceptors that can be disabled with the HttpService extension.
 * Except for very specific needs, you should better configure these interceptors directly in the constructor below
 * for better readability.
 *
 * For static interceptors that should always be enabled (like ApiPrefixInterceptor), use the standard
 * HTTP_INTERCEPTORS token.
 */
export const HTTP_DYNAMIC_INTERCEPTORS = new InjectionToken<HttpInterceptor>("HTTP_DYNAMIC_INTERCEPTORS");

/**
 * Extends HttpClient with per request configuration using dynamic interceptors.
 */
@Injectable({
  providedIn: "root",
})
export class HttpService<T> extends HttpClient {
  constructor(
    private httpHandler: HttpHandler,
    private injector: Injector,
    @Optional() @Inject(HTTP_DYNAMIC_INTERCEPTORS) private interceptors: HttpInterceptor[] = []
  ) {
    super(httpHandler);

    if (!this.interceptors) {
      // Configure default interceptors that can be disabled here
      this.interceptors = [
        this.injector.get(ApiPrefixInterceptor),
        this.injector.get(ErrorHandlerInterceptor),
      ];
    }
  }

  //   cache(forceUpdate?: boolean): HttpClient {
  //     const cacheInterceptor = this.injector
  //       .get(CacheInterceptor as Type<CacheInterceptor>)
  //       .configure({ update: forceUpdate });
  //     return this.addInterceptor(cacheInterceptor);
  //   }

  skipErrorHandler(): HttpClient {
    return this.removeInterceptor(ErrorHandlerInterceptor);
  }

  // Override the original method to wire interceptors when triggering the request.
  request(method?: any, url?: any, options?: any): any {
    var n = url.indexOf("undefined");
    if (n < 0) {
      const handler = this.interceptors.reduceRight(
        (next, interceptor) => new HttpInterceptorHandler(next, interceptor),
        this.httpHandler
      );
      return new HttpClient(handler).request(method, url, options);
    }
  }

  private removeInterceptor(interceptorType: Type<HttpInterceptor>): HttpService<T> {
    return new HttpService(
      this.httpHandler,
      this.injector,
      this.interceptors.filter((i) => !(i instanceof interceptorType))
    );
  }

  /**
   * @function get
   * @param {string} endpoint E.G. '/user'
   * @param {any} params E.G '?token=123
   * @description Make a GET api request to defined endpoint and add the parameters. This will return an array of elements
   * If no connection, the function will return a static response
   * @returns {Promise}
   */
  get<T>(endpoint?: string, params: any = {}, options?: any): Observable<T> {
    const paramsStr = {};
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        paramsStr[key] = JSON.stringify(params[key]);
      }
    }
    let opts: any = {
      ...{
        responseType: "json",
      },
      ...options,
      ...{ params: paramsStr },
    };
    return super.get<T>(endpoint, <{}>opts);
  }

  getMany(endpoint?: string, params: any = {}, options?: any) {
    return this.get<any>(endpoint, params, <{}>options);
  }

  /**
   * @function getOne
   * @param  {string} endpoint
   * @param  {string} id
   * @description Make a GET api request to defined "endpoint" and add the ID of the document
   * we want to find. This will return one single document. If no connection, the function will return
   * a static response.
   * @returns {Promise} Promise object represents the response.data (response is called "data" here) returned by the API
   */
  getOne(endpoint: string, id: string, params: any = {}) {
    const paramsStr = {};
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        paramsStr[key] = JSON.stringify(params[key]);
      }
    }
    return super.get(`${endpoint}/${id}`, {
      params: paramsStr,
    });
  }

  /**
   * @function createOne
   * @param {string} endpoint
   * @param {any} document
   * @description Make a POST api request to defined endpoint and add the data body. This request will create a new document
   * @returns {Promise}
   */
  createOne(endpoint: string, document: any) {
    let data = {
      data: document
    };
    let headers = {'Content-Type':'application/json'};
    let options = { headers: headers, method: "post"};
    return super.post(
      `${endpoint}/new`,
      document,
      options
    );
  }

  /**
   * @function createMany
   * @param {string} endpoint
   * @param {any} document
   * @description Make a POST api request and add data body, this should be a csv file. So, instead of sending a json object as
   * data, we'll be sending a binary that will be parsed at the backend
   * @returns {Promise}
   */
  createMany(endpoint: string, document: any) {
    return super.post(`${endpoint}`, document);
  }

  /**
   * @function updateOne
   * @param {string} endpoint
   * @param {string} id
   * @param {any} document
   * @description Make a PATCH api request to defined "endpoint" and add the ID of the document
   * we want to update with the "document" (js object) data. This will return one single document. If no connection, the function will return
   * a static response.
   * @returns {Promise} Promise object represents the response.data (response is called "data" here) returned by the API.
   */
  updateOne(endpoint: string, id: number, document: any) {
    return super.patch(`${endpoint}/${id}`, document);
  }

  /**
   * @function updateMany
   * @param {string} endpoint
   * @param {any} data
   * @description We need to pass the ids array in data object
   * @returns {Promise}
   */
  updateMany(endpoint: string, data: any, ids: string[]) {
    return super.patch(`${endpoint}`, data, {
      params: {
        items: ids,
      },
    });
  }

  /**
   * @function deleteOne
   * @param {string} endpoint
   * @param {string} id
   * @description Make a DELETE api request to defined endpoint and adding id to the endpoint, so document will be deleted
   * @returns {Promise}
   */
  deleteOne(endpoint: string, id: string, params: any = {}) {
    const paramsStr = {};
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        paramsStr[key] = JSON.stringify(params[key]);
      }
    }
    return this.delete(`${endpoint}/${id}`, {
      params: paramsStr,
    });
  }

  /**
   * @function deleteMany
   * @param {string} endpoint
   * @param {string[]} ids
   * @description Make a DELETE api request to defined endpoint and add parameters, so documents with the ids
   * listed in params will be deleted
   * @returns {Promise}
   */
  deleteMany(endpoint: string, ids: string[]) {
    return this.delete(endpoint, {
      params: {
        items: ids,
      },
    });
  }
}
