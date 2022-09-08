import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration/registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddmemberComponent } from './addmember/addmember.component';
import { MatchPasswordDirective } from '../match-password.directive';
import { CustomValidatorDirective } from '../custom-validator.directive';
import { EmailValidatorDirective } from '../email-validator.directive';




@NgModule({
  declarations: [
    RegistrationComponent,
    AddmemberComponent,
    MatchPasswordDirective,
    CustomValidatorDirective,
    EmailValidatorDirective,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class AdminModule { }
