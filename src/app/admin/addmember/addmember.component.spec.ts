import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { AddmemberComponent } from './addmember.component';
describe('AddmemberComponent', () => {
  let component: AddmemberComponent;
  let fixture: ComponentFixture<AddmemberComponent>;
  let el: HTMLElement;
  let de: DebugElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddmemberComponent],
      imports: [
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(
          {
            timeOut: 1000,
            positionClass: 'toast-top-right',
            preventDuplicates: true,
          }
        ),],
      providers: [DatePipe]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddmemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call save method', () => {
    fixture.detectChanges();
    spyOn(component, 'onDetailsSubmit');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(component.onDetailsSubmit).toHaveBeenCalled();
  });
});
