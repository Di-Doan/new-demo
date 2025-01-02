import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment';

@Injectable({
  providedIn: "root",
})
export class SubscriptionService {
  apiUrl = `${environment.apiUrl}/subscription`;

  constructor(private http: HttpClient) {}


  getAllSubscription(): Observable<any> {
    const url = `${this.apiUrl}/get-all-subscription`;
    return this.http.get(url, { withCredentials: true });
  }

  deleteSelectedSubscriptions(subscriptionId: string): Observable<any> {
    const url = `${this.apiUrl}/delete-subscription-by-id/${subscriptionId}`;
    return this.http.delete(url, { withCredentials: true });
  }


  deleteMultipleSubscription(subscriptionList: any): Observable<any> {
    const url = `${this.apiUrl}/delete-multiple-subscription`;
    return this.http.post(url, subscriptionList, { withCredentials: true });
  }
}