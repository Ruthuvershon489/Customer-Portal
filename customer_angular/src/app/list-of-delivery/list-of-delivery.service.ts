import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ListOfDeliveryService {

  constructor(private _http: HttpClient) { }

  private url = 'http://localhost:3030/list-of-delivery';
  
  public listofdelivery(){
    return this._http.post<any>(this.url, {
    })
  }
}
