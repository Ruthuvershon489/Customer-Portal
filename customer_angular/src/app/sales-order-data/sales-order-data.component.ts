import { Component, OnInit } from '@angular/core';
import { SalesOrderDataService } from './sales-order-data.service';

@Component({
  selector: 'app-sales-order-data',
  templateUrl: './sales-order-data.component.html',
  styleUrls: ['./sales-order-data.component.scss']
})
export class SalesOrderDataComponent implements OnInit {

  constructor(private _httpservice: SalesOrderDataService) { }

  SALES_ORDER: any;
  searchtext: any;

  headers = ["SD_DOC_NO", "ITEM_NUMBER", "MATERIAL_NO", "SHORT_TEXT", "SALES_DOC_TYPE", "DOCUMENT_DATE",
    "CUMULATIVE_OREDR_QUANTITY", "REQUESTED_DELIVERY_DATE", "PO_NO", "SOLD-TO_PARTY", "NAME", "EXCHANGE_RATE",
    "QUANTITY_DELIVERED", "BASE_UNIT_OF_MEASUREMENT", "NET_PRICE", "CONDITION_PRICING_UNIT", "CONDITION_UNIT",
    "NET_VALUE", "DIVISION", "DOCUMENT_STATUS", "GOODS_ISSUE_DATE", "SD_DOC_CURRENCY", "STORAGE_LOCATION",
    "ISO_CODE_CURRENCY"];

  names = ["SD_DOC", "ITM_NUMBER", "MATERIAL", "SHORT_TEXT", "DOC_TYPE", "DOC_DATE", "REQ_QTY", "REQ_DATE", "PURCH_NO",
    "SOLD_TO", "NAME", "EXCHG_RATE", "DLV_QTY", "BASE_UOM", "NET_PRICE", "COND_P_UNT", "COND_UNIT", "NET_VALUE",
    "DIVISION", "DOC_STATUS", "GI_DATE", "CURRENCY", "STORE_LOC", "CURR_ISO"];

  ngOnInit() {
    this._httpservice.salesorder().subscribe(
      data => {
        this.SALES_ORDER = data;
        if (this.SALES_ORDER == null) {
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
