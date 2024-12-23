import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environment";

@Injectable({
  providedIn: "root",
})
export class UserGiftService {
  apiUrl = `${environment.apiUrl}/userGift`;

  constructor(private http: HttpClient) {}

  getAllUserGift(): Observable<any> {
    const url = `${this.apiUrl}/getAllUserGift`;
    return this.http.get(url, { withCredentials: true });
  }

  exchangeGift(giftId: string): Observable<any> {
    const url = `${this.apiUrl}/exchangeGift`;
    return this.http.post(url, {giftId: giftId}, { withCredentials: true });
  }

  getUserGiftList(): Observable<any> {
    const url = `${this.apiUrl}/getUserGiftList`;
    return this.http.get(url, { withCredentials: true })
  }
}
