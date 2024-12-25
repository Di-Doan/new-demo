// loading.interceptor.ts
// import { Injectable, NgZone } from "@angular/core";
// import {
//   HttpRequest,
//   HttpHandler,
//   HttpInterceptor,
//   HttpEvent,
//   HttpErrorResponse,
// } from "@angular/common/http";
// import { Observable, throwError } from "rxjs";
// import { catchError, finalize } from "rxjs/operators";
// import { SpinnerService } from "../../core/service/spinner.service";

// @Injectable()
// export class LoadingInterceptor implements HttpInterceptor {
//   constructor(private spinnerService: SpinnerService) {}

//   intercept(
//     req: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     console.log('Intercepted Request:', req);
//     this.spinnerService.show();

//     return next.handle(req).pipe(
//       catchError((error: HttpErrorResponse) => {
//         console.log(error)
//         return throwError(() => error);
//       }),
//       finalize(() => {
//         console.log("hide loading")
//         this.spinnerService.hide();
//       })
//     );

//   }

// }

import { inject, Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpEvent } from '@angular/common/http';
import { finalize, switchMap } from 'rxjs/operators';
import { Observable, timer } from 'rxjs';
import { SpinnerService } from '../../core/service/spinner.service';

export interface ApiRequestMatcher {
  url: string | RegExp;
  method: RestMethod;
  body?: Record<string, any>;
  delay?: number;
}

type RestMethod = REST_METHOD.GET | REST_METHOD.POST | REST_METHOD.PUT | REST_METHOD.PATCH | REST_METHOD.DELETE;
enum REST_METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
  ANY = '.*',
}

const apiRequestIgnoreSpinnerMatchers: ApiRequestMatcher[] = [
  {
    method: REST_METHOD.GET,
    url: '/api/notifications-service/client-api/v2/notifications',
  },
  {
    method: REST_METHOD.PUT,
    url: 'api/messages-service/client-api/v5/message-center/messages/conversations/read',
  },
  {
    method: REST_METHOD.GET,
    url: 'api/messages-service/client-api/v5/message-center/messages/conversations',
  },
  {
    method: REST_METHOD.GET,
    url: '/api/notifications-service/client-api/v3/notifications/unread-count',
  }
];

const apiRequestRelayMatchers: ApiRequestMatcher[] = [
  {
    method: REST_METHOD.GET,
    url: /\/api\/payment-order-service\/client-api\/v2\/payment-orders\/[A-Za-z0-9\\-]+\/progress-status/,
    delay: 1000,
  },
];


@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private callStack = 0;
  private spinnerService = inject(SpinnerService)

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {

    this.callStack++;
    if (this.callStack === 1) {
      this.spinnerService.show();
    }

    return this.handleRequestNext(request, next).pipe(
      finalize(() => {
        if (this.callStack === 0) {
          this.spinnerService.hide();
        }
      }),
    );
  }

  private handleRequestNext(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const delay = 0;

    if (delay) return timer(delay).pipe(switchMap(() => next.handle(request)));
    return next.handle(request);
  }

}