import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration/registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddmemberComponent } from './addmember/addmember.component';
import { MatchPasswordDirective } from '../directives/match-password.directive';
import { CustomValidatorDirective } from '../directives/custom-validator.directive';
import { EmailValidatorDirective } from '../directives/email-validator.directive';
import { SearchmemberComponent } from './searchmember/searchmember.component';
import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
  declarations: [
    RegistrationComponent,
    AddmemberComponent,
    MatchPasswordDirective,
    CustomValidatorDirective,
    EmailValidatorDirective,
    SearchmemberComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
  ]
})
export class AdminModule { }
