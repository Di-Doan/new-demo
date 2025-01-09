import { TokenHelper } from "./../../shared/helper/token.helper";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "../../environment";
import { Router } from "@angular/router";
import { UserModel } from "../../shared/models";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  apiUrl = environment.apiUrl;

  private userSubject: BehaviorSubject<UserModel> =
    new BehaviorSubject<UserModel>(new UserModel());
    
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
    this.userSubject.next(new UserModel());
    const url = `${this.apiUrl}/auth/logout`;
    return this.http.get(url, { withCredentials: true });
  }

  forgetPassword(email: string): Observable<any> {
    const url = `${this.apiUrl}/auth/reset-password-email`;
    return this.http.post(url, { userEmail: email });
  }

  sendSubscriptionEmail(email: string): Observable<any> {
    const url = `${this.apiUrl}/auth/send-subscription`;
    return this.http.post(url, { userEmail: email });
  }

  resetPassword(email: string, otp: number, password: string): Observable<any> {
    const url = `${this.apiUrl}/auth/reset-password`;
    return this.http.post(url, {
      userEmail: email,
      otp: otp,
      password: password,
    });
  }

  setAuthState(user: UserModel) {
    const userData = new UserModel(user);
    this.userSubject.next(userData);
    this.router.navigate([
      user.role == "admin" || user.role == "superAdmin" ? "/admin" : "/",
    ]);
  }

  fetchAllUser(): Observable<any> {
    const url = `${this.apiUrl}/user/get-all-user`;
    return this.http.get(url, { withCredentials: true });
  }

  deleteSelectedUser(userId: string): Observable<any> {
    const url = `${this.apiUrl}/user/delete-user-by-id/${userId}`;
    return this.http.delete(url, { withCredentials: true });
  }

  updateUserInfo(userId: string, updatedInfo: UserModel): Observable<any> {
    const url = `${this.apiUrl}/user/update-user-by-id`;
    return this.http.post(
      url,
      { userId, updatedInfo },
      { withCredentials: true }
    );
  }

  createNewUser(newUser: UserModel): Observable<any> {
    const url = `${this.apiUrl}/user/create-user`;
    return this.http.post(
      url,
      {
        newUser,
      },
      { withCredentials: true }
    );
  }

  deleteMultipleUsers(userList: any): Observable<any> {
    const url = `${this.apiUrl}/user/delete-multiple-users`;
    return this.http.post(url, userList, { withCredentials: true });
  }

  updateUserData(newData: any) {
    this.userSubject.next(newData);
  }
}
