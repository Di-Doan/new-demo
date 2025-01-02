import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "../../environment";

@Injectable({
  providedIn: "root",
})
export class UserGiftService {
  apiUrl = `${environment.apiUrl}/userGift`;

  private giftListSubject: BehaviorSubject<any> = new BehaviorSubject<any>([])

  userGifList$ = this.giftListSubject.asObservable()

  constructor(private http: HttpClient) {}

  getAllUserGift(): Observable<any> {
    const url = `${this.apiUrl}/get-all-user-gift`;
    return this.http.get(url, { withCredentials: true });
  }

  exchangeGift(giftId: string): Observable<any> {
    const url = `${this.apiUrl}/exchange-gift`;
    return this.http.post(url, {giftId: giftId}, { withCredentials: true });
  }

  getUserGiftList(): Observable<any> {
    const url = `${this.apiUrl}/get-user-gift-list`;
    return this.http.get(url, { withCredentials: true })
  }

  updateUserGiftList(newList: any) {
    this.giftListSubject.next(newList)
  }
}
