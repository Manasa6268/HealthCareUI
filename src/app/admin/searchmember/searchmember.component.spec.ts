import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';

import { SearchmemberComponent } from './searchmember.component';

describe('SearchmemberComponent', () => {
  let component: SearchmemberComponent;
  let fixture: ComponentFixture<SearchmemberComponent>;
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
        NgxPaginationModule,
      ],
      declarations: [SearchmemberComponent],
      providers: [DatePipe]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SearchmemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call get MemberDetails method', () => {
    fixture.detectChanges();
    spyOn(component, 'getMemberDetails');
    el = fixture.debugElement.queryAll(By.css('button'))[3].nativeElement;
    console.log(el)
    el.click();
    expect(component.getMemberDetails).toHaveBeenCalled();
  });
  it('should call add member method', () => {
    fixture.detectChanges();
    spyOn(component, 'addmember');
    el = fixture.debugElement.queryAll(By.css('button'))[1].nativeElement;
    console.log(el)
    el.click();
    expect(component.addmember).toHaveBeenCalled();
  });
  it('should call logout method', () => {
    fixture.detectChanges();
    spyOn(component, 'logout');
    el = fixture.debugElement.queryAll(By.css('button'))[0].nativeElement;
    console.log(el)
    el.click();
    expect(component.logout).toHaveBeenCalled();
  });
});
