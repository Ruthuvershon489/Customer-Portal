import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SalesOrderDataService {

  constructor(private _http: HttpClient) { }

  private url = 'http://localhost:3030/sales-order-data';
  
  public salesorder(){
    return this._http.post<any>(this.url, {
    })
  }
}
