import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { CustomValidatorDirective } from 'src/app/directives/custom-validator.directive';
import { EmailValidatorDirective } from 'src/app/directives/email-validator.directive';
import { MatchPasswordDirective } from 'src/app/directives/match-password.directive';

import { RegistrationComponent } from './registration.component';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let el: HTMLElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(
          {
            timeOut: 1000,
            positionClass: 'toast-top-right',
            preventDuplicates: true,
          }
        ),
      ],
      declarations: [RegistrationComponent, MatchPasswordDirective,
        CustomValidatorDirective,
        EmailValidatorDirective,],
      providers: [DatePipe]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call login method', () => {
    fixture.detectChanges();
    spyOn(component, 'login');
    el = fixture.debugElement.queryAll(By.css('button'))[2].nativeElement;
    console.log(el)
    el.click();
    expect(component.login).toHaveBeenCalled();
  });

});
