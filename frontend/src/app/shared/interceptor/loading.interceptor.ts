// loading.interceptor.ts
import { Injectable, NgZone } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpEvent,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { SpinnerService } from "../../core/service/spinner.service";

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private spinnerService: SpinnerService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('Intercepted Request:', req);
    this.spinnerService.show();

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error)
        return throwError(() => error);
      }),
      finalize(() => {
        console.log("hide loading")
        this.spinnerService.hide();
      })
    );

  }

}
