import { Component, OnInit } from '@angular/core';
import { InquiryService } from './inquiry.service';

@Component({
  selector: 'app-inquiry',
  templateUrl: './inquiry.component.html',
  styleUrls: ['./inquiry.component.scss']
})
export class InquiryComponent implements OnInit {

  constructor(private _httpservice: InquiryService) { }

  INQUIRY: any;
  searchtext: any;

  headers = ["CREATED_ON", "CREATED_PERSON", "QUOTATION/INQUIRY_VALID_FROM", "DATE_UNTIL_BID/QUOTATION_IS_BINDING", "DOCUMENT_DATE", "REQUESTED_DELIVERY_DATE"];
  
  names = ["ERDAT", "ERNAM", "ANGDT", "BNDDT", "AUDAT", "VDATU"];

  ngOnInit() {
    this._httpservice.inquiry().subscribe(
      data =>{
        this.INQUIRY = data;
        if(this.INQUIRY == null){
          alert("OOPS! No transactional data found!");
        }
        console.log(data);
      }, err => {
        console.log(err);
      }
    )
  }

  /////////////////////   Sorting   ///////////////////////
  key: String = "id";
  reverse: boolean = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
}
