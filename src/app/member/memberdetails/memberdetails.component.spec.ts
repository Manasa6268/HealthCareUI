import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';

import { MemberdetailsComponent } from './memberdetails.component';

describe('MemberdetailsComponent', () => {
  let component: MemberdetailsComponent;
  let fixture: ComponentFixture<MemberdetailsComponent>;
  let el: HTMLElement
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
      declarations: [MemberdetailsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MemberdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call logout method', () => {
    fixture.detectChanges();
    spyOn(component, 'onclick');
    el = fixture.debugElement.queryAll(By.css('button'))[1].nativeElement;
    console.log(el)
    el.click();
    expect(component.onclick).toHaveBeenCalled();
  });
});
