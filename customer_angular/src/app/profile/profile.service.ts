import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private _http: HttpClient) { }

  private url = 'http://localhost:3030/profile';
  
  public profile(){
    return this._http.post<any>(this.url, {
    })
  }
}
