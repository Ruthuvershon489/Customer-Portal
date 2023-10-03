import { Component, OnInit, ViewChild } from '@angular/core';
import { PayageService } from './payage.service';

@Component({
  selector: 'app-payage',
  templateUrl: './payage.component.html',
  styleUrls: ['./payage.component.scss']
})
export class PayageComponent implements OnInit {

  constructor(private _httpservice: PayageService) { }

  PAYAGE: any;
  searchtext: any;

  headers = ["COMPANY_CODE", "CUSTOMER", "DOC_NO (CLEARING DOC)", "ASSIGNMENT_NO", "FINANCIAL_YEAR", "DOC_NO", "ITEM_NO", "POSTING_DATE", "DOCUMENT_DATE",
    "ENTRY_DATE", "CURRENCY_KEY", "LOCAL_CURRENCY", "REFERENCE_DOC_NO", "DOCUMENT_TYPE", "FINANCIAL_PERIOD", "TAX_CODE", "AMOUNT_IN_LOCAL_CURRENCY",
    "AMOUNT_IN_DOCUMENT_CURRENCY", "BASELINE_DATE", "UPDATE_CURRENCY", "REFERENCE_PROCEDURE", "BILLING_DOCUMENT", "REFERENCE_DOC_NO"];

  names = ["COMP_CODE", "CUSTOMER", "CLR_DOC_NO", "ALLOC_NMBR", "FISC_YEAR", "DOC_NO", "ITEM_NUM", "PSTNG_DATE", "DOC_DATE", "ENTRY_DATE", "CURRENCY", "LOC_CURRCY", "REF_DOC_NO", "DOC_TYPE",
    "FIS_PERIOD", "TAX_CODE", "LC_AMOUNT", "AMT_DOCCUR", "BLINE_DATE", "T_CURRENCY", "OBJ_TYPE", "BILL_DOC", "REF_DOC_NO_LONG"];


  ngOnInit() {
    this._httpservice.payage().subscribe(
      data => {
        this.PAYAGE = data;
        if (this.PAYAGE == null) {
          alert("OOPS! No transactional data found!");
        }
        console.log(this.PAYAGE);
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
