import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment';
import { ContactModel } from '../../shared/models';


@Injectable({
    providedIn: 'root'
  })

export class ContactService {
    apiUrl = `${environment.apiUrl}/contact`

    constructor(private http: HttpClient) { }

    createNewContact(contact: ContactModel): Observable<any> {
        const url = `${this.apiUrl}/createNewContact`
        return this.http.post(url, contact)
    }
}