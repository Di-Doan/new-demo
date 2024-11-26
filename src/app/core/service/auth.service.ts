import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const url = '/mock-api/user-data/login'
    return this.http.post(url, {username, password})
  }

  logout() {
    localStorage.removeItem('user')
    window.location.reload()
  }

  forgetPassword(email: string): Observable<any> {
    const url = '/mock-api/user-data/forget-password'
    return this.http.post(url, email)
  }
}
