import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { MemberDetails, States } from 'src/app/models/admin.model';
import { AdminService } from 'src/app/services/admin.service';
@Component({
  selector: 'app-addmember',
  templateUrl: './addmember.component.html',
  styleUrls: ['./addmember.component.css']
})
export class AddmemberComponent implements OnInit {
  passwordpattern: string = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,15}$";
  namepattern: string = "^(?=.*?[A-Z])(?=.*?[a-z]).{5,20}$";
  emailpattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  closeResult: string = "";
  Members: MemberDetails[] = [];
  States: States[] = []
  Member: MemberDetails = {
    id: 0,
    code: '',
    firstName: '',
    lastName: '',
    userName: '',
    password: '',
    confirmpassword: '',
    userType: '',
    dob: new Date(),
    address: '',
    city: '',
    state: 'Select',
    email: '',
    physicianName: '',
    createdDate: new Date(),
    modifiedDate: new Date(),
    modifiedBy: ''
  }
  today = this.datepipe.transform(new Date(), "yyyy-MM-dd")
  constructor(private datepipe: DatePipe, private toaster: ToastrService, private adminService: AdminService, private router: Router) { }
  ngOnInit(): void {
    this.adminService.GetStates()
      .subscribe(
        data => {
          this.States = data;
        });

  }
  onDetailsSubmit() {
    this.Member.userType = "Member";
    this.Member.password = "Admin@1234";
    this.adminService.Signup(this.Member)
      .pipe(first())
      .subscribe(
        data => {
          this.toaster.success("Member Added Sucessfully");
          this.router.navigate(['/searchmember']);
        },
        error => {
          console.log(error);
        });
  }
  searchmember() {
    this.router.navigate(['/searchmember'])
  }
}