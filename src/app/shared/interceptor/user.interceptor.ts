import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
  HttpClient,
} from '@angular/common/http';
import { catchError, map, Observable, of, throwError } from 'rxjs';

@Injectable()
export class UserDataInterceptor implements HttpInterceptor {
  private dataUrl = '../../../assets/json/user.json'
  constructor(private http: HttpClient) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      req.method === 'POST' &&
      req.url.endsWith('/mock-api/user-data/login')
    ) {
      const { username, password } = req.body;

      return this.http.get<any[]>(this.dataUrl).pipe(
        map(users => {
          // Find the user by username
          const user = users.find(u => u.username === username);

          // Check if user exists and password matches
          if (user && user.password === password) {
            // Return successful response with user name and points
            return new HttpResponse({
              status: 200,
              body: { name: user.name, point: user.point }
            });
          } else {
            // Return error response with 401 status for invalid credentials
            return new HttpResponse({
              status: 401,
              body: { message: 'Mật khẩu hoặc tên đăng nhập không đúng' }
            });
          }
        }),
        catchError((error) => {
          // Catch any errors and return a generic 500 error
          return throwError(() => new Error('Đã có lỗi xảy ra'));
        })
      );
    }

    return next.handle(req);
  }
}
