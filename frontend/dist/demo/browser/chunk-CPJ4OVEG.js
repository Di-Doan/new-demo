import{w as o,z as a}from"./chunk-W4VWF4WH.js";import{X as i,aa as n}from"./chunk-5ETVNT53.js";var h=(()=>{class r{constructor(t){this.http=t,this.apiUrl=`${a.apiUrl}/contact`}createNewContact(t){let e=`${this.apiUrl}/create-new-contact`;return this.http.post(e,t)}getAllContact(){let t=`${this.apiUrl}/get-all-contact`;return this.http.get(t,{withCredentials:!0})}deleteSelectedContacts(t){let e=`${this.apiUrl}/delete-contact-by-id/${t}`;return this.http.delete(e,{withCredentials:!0})}updateContactInfo(t,e){let c=`${this.apiUrl}/update-contact-by-id`;return this.http.post(c,{contactId:t,updatedInfo:e},{withCredentials:!0})}deleteMultipleContact(t){let e=`${this.apiUrl}/delete-multiple-contact`;return this.http.post(e,t,{withCredentials:!0})}static{this.\u0275fac=function(e){return new(e||r)(n(o))}}static{this.\u0275prov=i({token:r,factory:r.\u0275fac,providedIn:"root"})}}return r})();export{h as a};
