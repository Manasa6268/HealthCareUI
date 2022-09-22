import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './admin/login/login.component';
import { RegistrationComponent } from './admin/registration/registration.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AdminModule } from './admin/admin.module';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { ToastrModule } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { AddmemberComponent } from './admin/addmember/addmember.component';
import { MemberModule } from './member/member.module';
import { SubmitclaimComponent } from './member/submitclaim/submitclaim.component';
import { MemberdetailsComponent } from './member/memberdetails/memberdetails.component';
import { SearchmemberComponent } from './admin/searchmember/searchmember.component';
import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent },
      { path: 'register', component: RegistrationComponent },
      { path: 'addmember', component: AddmemberComponent },
      { path: 'submitclaim', component: SubmitclaimComponent },
      { path: 'memberdetails', component: MemberdetailsComponent },
      { path: 'searchmember', component: SearchmemberComponent },
      { path: 'submitclaim/:memberId/:count', component: SubmitclaimComponent },
    ]),
    NgbModalModule,
    HttpClientModule,
    ToastrModule.forRoot(
      {
        timeOut: 1000,
        positionClass: 'toast-top-right',
        preventDuplicates: true,
      }
    ),
    BrowserAnimationsModule,
    NgxPaginationModule,
  ],
  providers: [{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
