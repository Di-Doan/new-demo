import { TokenHelper } from "./../../shared/helper/token.helper";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "../../environment";
import { Router } from "@angular/router";
import { GiftModel, UserModel } from "../../shared/models";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  apiUrl = environment.apiUrl;

  // Define subjects to manage authentication state
  private userSubject: BehaviorSubject<any> = new BehaviorSubject<any>({
    email: "",
    point: null,
    role: "user",
  });

  user$ = this.userSubject.asObservable();

  constructor(
    private http: HttpClient,
    private TokenHelper: TokenHelper,
    private router: Router
  ) {
    const savedUser = this.TokenHelper.fetchUserDataCookie();
    if (savedUser) {
      this.userSubject.next(savedUser);
    }
  }

  login(userEmail: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/auth/signin`;
    return this.http.post(
      url,
      { userEmail, password },
      { withCredentials: true }
    );
  }

  logout() {
    this.TokenHelper.deleteCookie("user_data");
    this.userSubject.next(null);
    const url = `${this.apiUrl}/auth/logout`;
    return this.http.get(url, { withCredentials: true });
  }

  forgetPassword(email: string): Observable<any> {
    const url = `${this.apiUrl}/auth/resetPasswordEmail`;
    return this.http.post(url, { userEmail: email });
  }

  sendSubscriptionEmail(email: string): Observable<any> {
    const url = `${this.apiUrl}/auth/sendSubscription`;
    return this.http.post(url, { userEmail: email });
  }

  resetPassword(email: string, otp: number, password: string): Observable<any> {
    const url = `${this.apiUrl}/auth/resetPassword`;
    return this.http.post(url, {
      userEmail: email,
      otp: otp,
      password: password,
    });
  }

  setAuthState(user: { email: string; point: number; role: string }) {
    this.userSubject.next(user);
    this.router.navigate([user.role == "admin" ? "/admin" : "/"]);
  }

  fetchAllUser(): Observable<any> {
    const url = `${this.apiUrl}/user/getAllUser`;
    return this.http.get(url, { withCredentials: true });
  }

  deleteSelectedUser(userId: string): Observable<any> {
    const url = `${this.apiUrl}/user/deleteUserById/${userId}`;
    return this.http.delete(url, { withCredentials: true });
  }

  updateUserInfo(userId: string, updatedInfo: UserModel): Observable<any> {
    const url = `${this.apiUrl}/user/updateUserById`;
    return this.http.post(url, { userId, updatedInfo }, { withCredentials: true });
  }

  createNewUser(
    username: string,
    name: string,
    password: string,
    email: string,
    point: number,
    role: string
  ): Observable<any> {
    const url = `${this.apiUrl}/user/createUser`;
    return this.http.post(url, {
      username,
      name,
      password,
      email,
      point,
      role,
    }, { withCredentials: true });
  }

  deleteMultipleUsers(userList: any): Observable<any> {
    const url = `${this.apiUrl}/user/deleteMultipleUsers`
    return this.http.post(url, userList, { withCredentials: true })
  }
}