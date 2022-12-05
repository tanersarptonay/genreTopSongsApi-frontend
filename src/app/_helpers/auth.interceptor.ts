import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StorageService } from "../_services/storage.service";

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
	constructor(private storageService: StorageService) { }


	intercept(req: HttpRequest<any>, next: HttpHandler) {
		const authToken = this.storageService.getToken();

		const authReq = req.clone({
			setHeaders: {
				Authorization: "Bearer " + authToken
			}
		});

		return next.handle(authReq);
	}
}

export const httpInterceptorProviders = [
	{ provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];
