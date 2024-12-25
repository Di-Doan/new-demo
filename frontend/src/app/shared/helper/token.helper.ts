import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class TokenHelper {
    fetchUserDataCookie() {
        const cookies = document.cookie.split(';')
        for (let cookie of cookies) {
            const [name, value] = cookie.split('=');
            if (name == "user_data") {
                return JSON.parse(decodeURIComponent(value))
            }
        }
        return null
    }

    deleteCookie(name: string) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
        return
    }
}