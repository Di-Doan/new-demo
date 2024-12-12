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

  getPost(): Observable<any> {
    const url = `${this.apiUrl}/getAllGift`
    return this.http.get(url)
  }

  deleteSelectedGifts(giftId: string): Observable<any> {
    const url = `${this.apiUrl}/deleteGiftById/${giftId}`
    return this.http.delete(url, { withCredentials: true })
  }

  updateGiftInfo(giftId:string, updatedInfo: GiftModel): Observable<any> {
    const url = `${this.apiUrl}/updateGiftById`
    return this.http.post(url, {giftId, updatedInfo}, { withCredentials: true })
  }

  createNewGift(img: string, name: string, start_date: string, end_date: string, point: number, isHot: boolean): Observable<any> {
    const url = `${this.apiUrl}/createGift`
    return this.http.post(url, {img, name, start_date, end_date, point, isHot}, { withCredentials: true })
  }

  deleteMultipleGift(giftList: any): Observable<any> {
    const url = `${this.apiUrl}/deleteMultipleGift`
    return this.http.post(url, giftList, { withCredentials: true })
  }

}
