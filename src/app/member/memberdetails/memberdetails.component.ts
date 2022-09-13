import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MemberDetails } from 'src/app/models/admin.model';
import { ClaimDetails } from 'src/app/models/claim.model';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-memberdetails',
  templateUrl: './memberdetails.component.html',
  styleUrls: ['./memberdetails.component.css']
})
export class MemberdetailsComponent implements OnInit {
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
    state: '',
    email: '',
    physicianName: '',
    createdDate: new Date(),
    modifiedDate: new Date(),
    modifiedBy: ''
  }
  Claims: ClaimDetails[] = []
  Claim: ClaimDetails =
    {
      id: 0,
      code: '',
      memberId: null,
      claimType: '',
      claimAmount: 0,
      claimDate: new Date(),
      remarks: '',
      createdBy: null
    }
  MemberId: string | null = '';
  code: number | null = 0;
  onclaims: boolean = true;
  onsubmit: boolean = false;
  constructor(private memberService: MemberService, private router: Router) { }

  ngOnInit(): void {
    this.MemberId = localStorage.getItem('userid');
    this.code = parseInt(localStorage.getItem('code')!);
    this.getdetails();
    this.getclaimdetails();
  }
  getdetails() {
    this.memberService.GetMemberDetails(this.code)
      .subscribe(
        data => {

          this.Member = data;
        });
  }
  getclaimdetails() {
    this.memberService.GetClaims(this.MemberId)
      .subscribe(
        data => {
          
          this.Claims = data;
          if (this.Claims.length > 0) {
            this.onclaims = false;
            this.onsubmit = true;
          }
        });
  }
  onclick() {
    this.router.navigate(['submitclaim'])
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
