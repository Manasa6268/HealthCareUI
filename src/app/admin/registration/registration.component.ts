import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs';
import { MemberDetails, States, UserTypes } from 'src/app/models/admin.model';
import { AdminService } from 'src/app/services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  detailsform!: FormGroup
  passwordpattern: string = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,15}$";
  namepattern: string = "^(?=.*?[A-Z])(?=.*?[a-z]).{5,20}$";
  emailpattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  closeResult: string = "";
  Members: MemberDetails[] = [];
  States: States[] = []
  UserTypes: UserTypes[] = [];
  passwordA: string = ''
  Member: MemberDetails = {
    Id: 0,
    Code: '',
    FirstName: '',
    LastName: '',
    UserName: '',
    Password: '',
    confirmpassword: '',
    UserType: '',
    DOB: new Date(),
    Address: '',
    City: '',
    State: '',
    Email: '',
    PhysicianName: '',
    CreatedDate: new Date(),
    ModifiedDate: new Date(),
    ModifiedBy: ''
  }
  today = this.datepipe.transform(new Date(), "yyyy-MM-dd")

  constructor(private router: Router, private modalService: NgbModal, private adminService: AdminService, private toaster: ToastrService, private datepipe: DatePipe) { }

  ngOnInit(): void {
    this.adminService.GetStates()
      .subscribe(
        data => {
          this.States = data;
        });
    this.adminService.GetUserTypes()
      .subscribe(
        data => {
          this.UserTypes = data;
        })

  }

  onSubmit() {

    this.adminService.Signup(this.Member)
      .pipe(first())
      .subscribe(
        data => {
          this.toaster.success("Registration Successfull");
          this.router.navigate(['']);
        },
        error => {
          console.log(error);
        });

  }
  onDetailsSubmit() {

    this.toaster.success("Details Submitted Successfully")

  }
  login() {
    this.router.navigate(['']);
  }
  onreset(form: NgForm) {
    form.reset()
  }
  open(content: any, usertype: string) {
    if (usertype == "Member") {
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}

