import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InquiryService {

  constructor(private _http: HttpClient) { }

  private url = 'http://localhost:3030/inquiry';

  public inquiry(){
    return this._http.post<any>(this.url, {
    })
  }
}
