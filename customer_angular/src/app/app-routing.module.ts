import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { CredDebComponent } from './cred-deb/cred-deb.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InquiryComponent } from './inquiry/inquiry.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { ListOfDeliveryComponent } from './list-of-delivery/list-of-delivery.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { PayageComponent } from './payage/payage.component';
import { ProfileComponent } from './profile/profile.component';
import { SalesOrderDataComponent } from './sales-order-data/sales-order-data.component';

const routes: Routes = [
  {
    path:'',
    redirectTo: 'login', pathMatch: 'full'
  },
  {
    path:'login',
    component:LoginPageComponent,
  },
  {
    path:'customer-portal/about',
    component:AboutComponent,
    data:{
      page: 'about'
    }
  },
  {
    path:'customer-portal/contact',
    component:ContactComponent,
    data:{
      page: 'contact'
    }
  },
  {
    path:'dashboard',
    component:DashboardComponent,
  },
  {
    path:'profile',
    component:ProfileComponent,
  },
  {
    path:'inquiry',
    component:InquiryComponent,
  },
  {
    path:'sales-order-data',
    component:SalesOrderDataComponent,
  },
  {
    path:'list-of-delivery',
    component:ListOfDeliveryComponent,
  },
  {
    path:'credit-debit',
    component:CredDebComponent,
  },
  {
    path:'invoice',
    component:InvoiceComponent,
  },
  {
    path:'payage',
    component:PayageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
