import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment';
import { GiftModel } from '../../shared/models';


@Injectable({
  providedIn: 'root'
})
export class GiftService {
  apiUrl = `${environment.apiUrl}/gift`

  constructor(private http: HttpClient) { }

  getAllGift(): Observable<any> {
    const url = `${this.apiUrl}/get-all-gift`
    return this.http.get(url)
  }

  deleteSelectedGifts(giftId: string): Observable<any> {
    const url = `${this.apiUrl}/delete-gift-by-id/${giftId}`
    return this.http.delete(url, { withCredentials: true })
  }

  updateGiftInfo(giftId:string, updatedInfo: GiftModel): Observable<any> {
    const url = `${this.apiUrl}/update-gift-by-id`
    return this.http.post(url, {giftId, updatedInfo}, { withCredentials: true })
  }

  createNewGift(img: string, name: string, start_date: string, end_date: string, point: number, isHot: boolean): Observable<any> {
    const url = `${this.apiUrl}/create-gift`
    return this.http.post(url, {img, name, start_date, end_date, point, isHot}, { withCredentials: true })
  }

  deleteMultipleGift(giftList: any): Observable<any> {
    const url = `${this.apiUrl}/delete-multiple-gift`
    return this.http.post(url, giftList, { withCredentials: true })
  }

}
