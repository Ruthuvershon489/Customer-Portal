import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginPageService } from './login-page.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  username: string="";
  password: string="";
  show: boolean= false;

  name: string="";

  constructor(private route: Router, private _httpservice: LoginPageService) { }
  
  ngOnInit() {}

  onSubmit(){
    
    console.log("username is " + this.username)
    console.log("password is " + this.password)
    this._httpservice.login(this.username, this.password).subscribe(
      data =>{
        console.log(data);
        if(data[0] == 'S'){
          this.name = data[1];
          this.route.navigate(['/dashboard'])
        }
      }, err => {
        console.log(err);
        alert("ruthu");
      }
    )
    this.clear();
  }

  clear(){
    this.username ="";
    this.password = "";
    this.show = true;
  }
  
}
