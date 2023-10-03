import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginPageService {

  constructor(private _http: HttpClient) {}

  private url = 'http://localhost:3030/login';
  
  public login(uname:any, psw:any){
    return this._http.post<any>(this.url, {
      uname: uname,
      password: psw
    })
  }
}
