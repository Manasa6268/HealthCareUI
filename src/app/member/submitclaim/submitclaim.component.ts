import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { ClaimDetails } from 'src/app/models/claim.model';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-submitclaim',
  templateUrl: './submitclaim.component.html',
  styleUrls: ['./submitclaim.component.css']
})
export class SubmitclaimComponent implements OnInit {
  numberpattern = "[1-9]{1}[0-9]{2,5}";
  Claims: ClaimDetails[] = [];
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
  today = this.datepipe.transform(new Date(), "yyyy-MM-dd")
  MemberId: string | null = ''
  MemberIds: Array<any> = []
  Id: string | null = ''
  Role: string | null = ''
  count: number = 0;
  memberhide: boolean = false;
  membershide: boolean = false;
  constructor(private memberService: MemberService, private toaster: ToastrService, private router: Router, private datepipe: DatePipe, private activatedRoot: ActivatedRoute) { }
  ngOnInit(): void {
    this.Id = localStorage.getItem('userid');
    this.Role = localStorage.getItem('role');
    if (this.Role == "Member") {
      this.membershide = true;
      this.memberhide = false
      this.MemberId = localStorage.getItem('userid');
    }
    else {
      this.memberhide = true;
      this.membershide = false;
      this.MemberIds = this.activatedRoot.snapshot.queryParams['memberId'];
      this.count = this.activatedRoot.snapshot.queryParams['count'];
    }
  }
  onSubmit() {
    if (this.Role == "Member") {
      this.Claim.memberId = this.MemberId;
      this.Claim.createdBy = this.MemberId;
      this.memberService.SubmitClaim(this.Claim)
        .pipe(first())
        .subscribe(
          data => {
            this.toaster.success("Claim Submission Successfull");
            this.router.navigate(['/memberdetails']);
          },
          error => {
            console.log(error);
          });
    }
    else {
      for (let i = 0; i <= this.count; i++) {
        this.Claim.memberId = this.MemberIds[i];
        this.MemberId = this.MemberIds[i];
        this.Claim.createdBy = this.Id;
        this.memberService.SubmitClaim(this.Claim).subscribe(
          data => {
            this.toaster.success("Claim Submission Successfull");
            this.router.navigate(['/searchmember']);
          });
      }
    }
  }
  oncancel() {
    if (this.Role == "Member") {
      this.router.navigate(['/memberdetails']);
    }
    else {
      this.router.navigate(['/searchmember']);
    }
  }
}
