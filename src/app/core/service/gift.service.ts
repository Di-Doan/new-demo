import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GiftService {
  private url = '/mock-api/gift-data'

  constructor(private http: HttpClient) { }

  getPost(): Observable<any> {
    return this.http.get(this.url)
  }

}
