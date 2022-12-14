import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatchPasswordDirective } from '../directives/match-password.directive';
import { CustomValidatorDirective } from '../directives/custom-validator.directive';
import { EmailValidatorDirective } from '../directives/email-validator.directive';
import { SubmitclaimComponent } from './submitclaim/submitclaim.component';
import { MemberdetailsComponent } from './memberdetails/memberdetails.component';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
    declarations: [
        SubmitclaimComponent,
        MemberdetailsComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
    ]
})
export class MemberModule { }
