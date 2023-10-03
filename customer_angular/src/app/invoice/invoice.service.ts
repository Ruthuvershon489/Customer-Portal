import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private _http: HttpClient) { }

  private url = 'http://localhost:3030/invoice';
  
  public invoice(){
    return this._http.post<any>(this.url, {
    })
  }
}
