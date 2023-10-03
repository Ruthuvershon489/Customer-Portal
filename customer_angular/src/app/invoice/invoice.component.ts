import { Component, OnInit } from '@angular/core';
import { InvoiceService } from './invoice.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  constructor(private _httpservice: InvoiceService) { }

  INVOICE: any;
  searchtext: any;

  headers = ["CLIENT", "BILLING_DOCUMENT", "BILLING_TYPE", "BILLING_CATEGORY", "SD_DOC_CATEGORY", "SD_DOC_CURRENCY", "SALES_ORGANIZATION", "SD_PRICING_PROCEDURE",
              "NO_OF_DOC_CONDITION", "SHIPPING_CONDITIONS", "BILLING_DATE", "PRICING_GROUP", "CUSTOMER_GROUP", "INCOTERMS1", "INCOTERMS2",
              "STATUS_OF_TRANSACTION", "EXCHANGE_RATE(FI POSTINGS)", "COUNTRY_OF_DESTINATION", "NET_VALUE_IN_DOC_CURRENECY", "ENTRY_TIME", "CREATED_ON", "STATISTICS_CURRENCY",
               "CUSTOMER_PO_NO", "ASSIGNMENT_NO", "LOGICAL_SYSTEM", "PAYMENT_REFERENCE"];
  
  names = ["MANDT", "VBELN", "FKART", "FKTYP", "VBTYP", "WAERK", "VKORG", "KALSM", "KNUMV", "VSBED", "FKDAT", "KONDA", "KDGRP", "INCO1","INCO2",
            "RFBSK", "KURRF", "LAND1", "NETWR", "ERZET", "ERDAT", "STWAE", "BSTNK_VF", "ZUONR", "LOGSYS", "KIDNO"];


  ngOnInit() {
    this._httpservice.invoice().subscribe(
      data =>{
        this.INVOICE = data;
        if(this.INVOICE == null){
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
