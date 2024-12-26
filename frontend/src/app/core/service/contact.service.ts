import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment';
import { ContactModel } from '../../shared/models';


@Injectable({
  providedIn: "root",
})
export class ContactService {
  apiUrl = `${environment.apiUrl}/contact`;

  constructor(private http: HttpClient) {}

  createNewContact(contact: ContactModel): Observable<any> {
    const url = `${this.apiUrl}/createNewContact`;
    return this.http.post(url, contact);
  }

  getAllContact(): Observable<any> {
    const url = `${this.apiUrl}/getAllContact`;
    return this.http.get(url, { withCredentials: true });
  }

  deleteSelectedContacts(contactId: string): Observable<any> {
    const url = `${this.apiUrl}/deleteContactById/${contactId}`;
    return this.http.delete(url, { withCredentials: true });
  }

  updateContactInfo(contactId: string, updatedInfo: ContactModel): Observable<any> {
    const url = `${this.apiUrl}/updateContactById`;
    return this.http.post(
      url,
      { contactId, updatedInfo },
      { withCredentials: true }
    );
  }

  deleteMultipleContact(contactList: any): Observable<any> {
    const url = `${this.apiUrl}/deleteMultipleContact`;
    return this.http.post(url, contactList, { withCredentials: true });
  }
}