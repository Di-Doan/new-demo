import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import * as mockData from '../../../assets/json/user.json';

@Injectable()
export class UserDataInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Kiểm tra URL nếu là endpoint cần mock
    if (req.url.endsWith('/mock-api/user-data')) {
      return of(new HttpResponse({ status: 200, body: mockData }));
    }
    return next.handle(req);
  }
}
