import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CredDebService {

  constructor(private _http: HttpClient) { }

  private url = 'http://localhost:3030/cred-deb';

  public cred_deb(){
    return this._http.post<any>(this.url, {
    })
  }
}
