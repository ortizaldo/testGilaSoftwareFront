import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';


/**
 * Prefixes all requests not starting with `http[s]` with `environment.serverUrl`.
 */
@Injectable({
	providedIn: 'root'
})
export class ApiPrefixInterceptor implements HttpInterceptor {

	constructor(
	) {
	}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (!/^(http|https):/i.test(request.url)) {
			const prefixUrl = this.apiPrefixUrl();
			request = request.clone({ url: prefixUrl + request.url });
		}
		return next.handle(request);
  }
  
  apiPrefixUrl() {
    // return `${environment.api}${environment.api_prefix}/api/${this.accountId}`;
    return `${environment.api}`;
  }
}