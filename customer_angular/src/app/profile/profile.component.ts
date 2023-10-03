import { Component, OnInit } from '@angular/core';
import { elementAt } from 'rxjs';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private _httpservice: ProfileService) { }

  customer: string="";
  name1: string="";
  name2: string="";
  city: string="";
  postal_code: string="";
  region: string="";
  country: string="";
  telephone: string="";
  address: string="";


  ngOnInit() {
    this._httpservice.profile().subscribe(
      data =>{
        this.customer = data[0].KUNNR;
        this.name1 = data[0].NAME2;
        this.name2 = data[0].NAME1;
        this.city = data[0].ORT01;
        this.postal_code = data[0].PSTLZ;
        this.region = data[0].REGIO;
        this.country = data[0].COUNTRY;
        this.telephone = data[0].TELF1;
        this.address = data[0].STRAS;
        console.log(data);
      }, err => {
        console.log(err);
      }
    )

    
    
  }
}
