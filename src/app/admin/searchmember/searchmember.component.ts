import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrIconClasses, ToastrService } from 'ngx-toastr';
import { MemberList, PhysicianAssign, PhysicianDetails } from 'src/app/models/admin.model';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-searchmember',
  templateUrl: './searchmember.component.html',
  styleUrls: ['./searchmember.component.css']
})
export class SearchmemberComponent implements OnInit {

  emailFormArray: string[] = [];
  memberid: string = '';
  firstName: string = '';
  lastName: string = '';
  PhysicianName: string = '';
  ClaimId: string = '';
  physician: PhysicianDetails[] = []
  MemberList: MemberList[] = [];
  tblhide: boolean = true
  headerhide: boolean = true
  hasphysician: boolean = false
  page: number = 1;
  count: number = 0;
  tableSize: number = 3;
  tableSizes: any = [3, 6, 9, 12];
  physicians: PhysicianAssign = {
    memberId: '',
    physicianName: null,
    adminId: ''
  }
  constructor(private adminService: AdminService, private router: Router, private modalService: NgbModal, private toaster: ToastrService) { }

  ngOnInit(): void {
    this.adminService.GetPhysicianNames()
      .subscribe(
        data => {
          this.physician = data;
        })
  }
  getMemberDetails() {

    this.adminService.GetMembers(this.memberid, this.firstName, this.lastName, this.PhysicianName, this.ClaimId)
      .subscribe(
        data => {
          if (data != null) {
            this.tblhide = false;
            this.headerhide = true;
            this.MemberList = data;
            this.MemberList.forEach((element) => {
              if (element.claimAmount != 0) {
                element.hasclaim = true;
              }
              else {
                element.hasclaim = false;
                element.claimDate = new Date();
              }
              if (element.physicianName != "") {
                element.hasphysician = true;
              }
              else {
                element.hasphysician = false;
              }
            });
          }
          else {
            this.MemberList = [];
            this.tblhide = true;
            this.headerhide = false;
          }
        })

  }
  addmember() {
    this.router.navigate(['addmember'])
  }

  onsubmitclaim() {


    if (this.emailFormArray.length > 0) {
      let memberId = JSON.stringify(this.emailFormArray)

      this.router.navigate(['/submitclaim'], { queryParams: { memberId: this.emailFormArray, count: this.emailFormArray.length } })
    }
    else {
      this.toaster.error("Please Select Member");
    }
  }
  onassign() {

  }
  open(content: any, memberId: string) {

    const activemodal = this.modalService.open(content);
    this.physicians.memberId = memberId;
  }
  AssignPhysician() {
    this.physicians.adminId = localStorage.getItem('userid')
    this.adminService.AssignPhysician(this.physicians)
      .subscribe(
        data => {
          this.toaster.success("Physician Assign Successfully");
          this.modalService.dismissAll();
          this.getMemberDetails();
        })
  }

  onChange(email: string, event: any) {
    if (event.target.checked) {
      this.emailFormArray.push(email);
    } else {
      let index = this.emailFormArray.indexOf(email);
      this.emailFormArray.splice(index, 1);
    }

  }
  onTableDataChange(event: any) {
    this.page = event;
    this.getMemberDetails();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getMemberDetails();
  }
  onreset(form: NgForm) {
    form.reset();
    this.MemberList = [];
    this.tblhide = true;
    this.headerhide = false;

  }
  logout() {
    localStorage.removeItem('userid');
    localStorage.removeItem('token');
    localStorage.removeItem('Name');
    localStorage.removeItem('role');
    localStorage.removeItem('code');
    this.router.navigate([''])
  }
}


