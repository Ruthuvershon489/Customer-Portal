import { Component, OnInit } from '@angular/core';
import { ListOfDeliveryService } from './list-of-delivery.service';

@Component({
  selector: 'app-list-of-delivery',
  templateUrl: './list-of-delivery.component.html',
  styleUrls: ['./list-of-delivery.component.scss']
})
export class ListOfDeliveryComponent implements OnInit {

  constructor(private _httpservice: ListOfDeliveryService) { }

  LIST_OF_DELIVERY: any;
  searchtext: any;

  headers = ["CLIENT", "DELIVERY", "CREATED_PERSON", "ENTRY_TIME", "CREATED_ON", "SHIPPING_POINT", "DELIVERY_TYPE",
              "PLANNED_DATE", "LOADING_DATE", "TRANSPORTATION_PLANNING_DATE", "DELIVERY_DATE", "PICKING_DATE", "SD_DOC_CATEGORY",
              "DELIVERY_PRIORITY", "SHIPPING_CONDITION", "CUSTOMER_GROUP", "WEIGHT_UNIT", "TIME_OF_DELIVERY",
              "WEIGHT_GROUP_FOR_DELIVERY", "PROPOSED_BILLING_TYPE", "BILLING_DATE", "SD_DOCUMENT_CURRENCY",
              "COMBINATION_CRITERIA_FOR_DELIVERY", "BILLING_TYPE", "DOC_DATE", "ACTUAL_GOODS_MOVEMENT_DATE",
              "WORLDWIDE_UNIQUE_KEY", "TIME_ZONE_OF_DELIVERING_LOCATION"];
  
  names = ["MANDT", "VBELN", "ERNAM", "ERZET", "ERDAT", "VSTEL", "LFART", "WADAT", "LDDAT", "TDDAT", "LFDAT", "KODAT", "VBTYP",
            "LPRIO", "VSBED", "KDGRP", "GEWEI", "LFUHR", "GRULG", "FKARV", "FKDAT", "WAERK", "ZUKRL", "FKAIV", "BLDAT",
            "WADAT_IST", "HANDLE", "TZONIS"];

  ngOnInit() {
    this._httpservice.listofdelivery().subscribe(
      data =>{
        this.LIST_OF_DELIVERY = data;
        if(this.LIST_OF_DELIVERY == null){
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
