import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PayageService {

  constructor(private _http: HttpClient) { }

  private url = 'http://localhost:3030/payage';

  public payage(){
    return this._http.post<any>(this.url, {
    })
  }
}
