import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { TokenHelper } from '../helper/token.helper';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private tokenHelper: TokenHelper) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.tokenHelper.fetchTokenCookie()

        if (token) {
            const clonedRequest = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${token}`  // Add the token to the Authorization header
                }
              });

              return next.handle(clonedRequest).pipe(
                catchError((error) => {
                  console.error('Error in interceptor:', error);
                  throw error;
                })
              );
        }

        return next.handle(req);
    }
}