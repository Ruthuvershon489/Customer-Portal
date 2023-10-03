import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatSortModule } from '@angular/material/sort';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { CredDebComponent } from './cred-deb/cred-deb.component';
import { ProfileComponent } from './profile/profile.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { PayageComponent } from './payage/payage.component';
import { ListOfDeliveryComponent } from './list-of-delivery/list-of-delivery.component';
import { SalesOrderDataComponent } from './sales-order-data/sales-order-data.component';
import { InquiryComponent } from './inquiry/inquiry.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    DashboardComponent,
    ContactComponent,
    AboutComponent,
    CredDebComponent,
    ProfileComponent,
    InvoiceComponent,
    PayageComponent,
    ListOfDeliveryComponent,
    SalesOrderDataComponent,
    InquiryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatToolbarModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    NgxPaginationModule,
    MatSortModule,
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
