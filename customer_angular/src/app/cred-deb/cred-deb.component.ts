import { Component, OnInit } from '@angular/core';
import { CredDebService } from './cred-deb.service';

@Component({
  selector: 'app-cred-deb',
  templateUrl: './cred-deb.component.html',
  styleUrls: ['./cred-deb.component.scss']
})
export class CredDebComponent implements OnInit {

  constructor(private _httpservice: CredDebService) { }

  CREDIT: any;
  DEBIT: any;

  searchtext1: any;
  searchtext2: any;

  CREDIT_headers = ["CLIENT", "BILLING_DOCUMENT", "BILLING_TYPE", "BILLING_CATEGORY", "SD_DOC_CATEGORY", "SD_DOC_CURRENCY", 
                    "SALES_ORGANIZATION", "SD_PRICING_PROCEDURE", "NO_OF_DOC_CONDITION", "SHIPPING_CONDITIONS", "BILLING_DATE",
                    "PRICING_GROUP", "CUSTOMER_GROUP", "INCOTERMS1", "INCOTERMS2", "STATUS_OF_TRANSACTION", "EXCHANGE_RATE(FI POSTINGS)",
                    "COUNTRY_OF_DESTINATION", "NET_VALUE_IN_DOC_CURRENECY", "ENTRY_TIME", "CREATED_ON", "STATISTICS_CURRENCY",
                    "CUSTOMER_PO_NO", "ASSIGNMENT_NO", "LOGICAL_SYSTEM", "PAYMENT_REFERENCE"];

  CREDIT_names = ["MANDT", "VBELN", "FKART", "FKTYP", "VBTYP", "WAERK", "VKORG", "KALSM", "KNUMV", "VSBED", "FKDAT", "KONDA", "KDGRP",
                  "INCO1","INCO2", "RFBSK", "KURRF", "LAND1", "NETWR", "ERZET", "ERDAT", "STWAE", "BSTNK_VF", "ZUONR", "LOGSYS",
                  "KIDNO"];

  DEBIT_headers = ["CLIENT", "BILLING_DOCUMENT", "BILLING_TYPE", "BILLING_CATEGORY", "SD_DOC_CATEGORY", "SD_DOC_CURRENCY", 
                    "SALES_ORGANIZATION", "SD_PRICING_PROCEDURE", "NO_OF_DOC_CONDITION", "SHIPPING_CONDITIONS", "BILLING_DATE",
                    "PRICING_GROUP", "CUSTOMER_GROUP", "INCOTERMS1", "INCOTERMS2", "STATUS_OF_TRANSACTION", "EXCHANGE_RATE(FI POSTINGS)",
                    "COUNTRY_OF_DESTINATION", "NET_VALUE_IN_DOC_CURRENECY", "ENTRY_TIME", "CREATED_ON", "STATISTICS_CURRENCY",
                    "CUSTOMER_PO_NO", "ASSIGNMENT_NO", "LOGICAL_SYSTEM", "PAYMENT_REFERENCE"];

  DEBIT_names = ["MANDT", "VBELN", "FKART", "FKTYP", "VBTYP", "WAERK", "VKORG", "KALSM", "KNUMV", "VSBED", "FKDAT", "KONDA", "KDGRP",
                  "INCO1","INCO2", "RFBSK", "KURRF", "LAND1", "NETWR", "ERZET", "ERDAT", "STWAE", "BSTNK_VF", "ZUONR", "LOGSYS",
                  "KIDNO"];
  ngOnInit() {
    this._httpservice.cred_deb().subscribe(
      data =>{
        this.CREDIT = data[0];
        this.DEBIT = data[1];
        if(this.CREDIT == null && this.DEBIT == null){
          alert("OOPS! No transactional data found!");
        }
        console.log(this.CREDIT);
        console.log(this.DEBIT);
      }, err => {
        console.log(err);
      }
    )
  }

  /////////////////////   Sorting   ///////////////////////
  key1: String = "id1";
  reverse1: boolean = false;
  sort1(key) {
    this.key1 = key;
    this.reverse1 = !this.reverse1;
  }

  key2: String = "id2";
  reverse2: boolean = false;
  sort2(key) {
    this.key2 = key;
    this.reverse2 = !this.reverse2;
  }

}
