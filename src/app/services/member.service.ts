import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { url } from '../models/url.model';
import { MemberDetails, States, UserCredentials, UserTypes } from '../models/admin.model';
import { ClaimDetails } from '../models/claim.model';

@Injectable({ providedIn: 'root' })
export class MemberService {
  public apiUrl: string;
  constructor(private http: HttpClient) {
    this.apiUrl = url;
  }
  // login(cred: UserCredentials): Observable<string> {
  //   return this.http.post<any>(`${this.apiUrl}/api/GetToken`, { userName: cred.userName, password: cred.password });
  // }
  SubmitClaim(claim: ClaimDetails): Observable<string> {
    return this.http.post<any>(`${this.apiUrl}/member/SubmitClaim`,
      {

        "Id": 0,
        "Code": "",
        "memberId": claim.memberId,
        "claimType": claim.claimType,
        "claimAmount": claim.claimAmount,
        "claimDate": claim.claimDate,
        "remarks": claim.remarks,
        "createdBy": claim.createdBy


      },
      {
        headers: new HttpHeaders(
          {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
          })
      });




  }
  GetClaimTypes(): Observable<States[]> {
    return this.http.get<any>(`${this.apiUrl}/claimtypes`);
  }
  GetMemberDetails(code: number | null): Observable<MemberDetails> {
    return this.http.get<MemberDetails>(this.apiUrl + '/member/fetchDetails?MemberId=' + code,
      {
        headers: new HttpHeaders(
          {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
          })
      });
  }
  GetClaims(MemberId: string | null): Observable<ClaimDetails[]> {
    return this.http.get<ClaimDetails[]>(this.apiUrl + '/member/fetchClaimDetails?MemberId=' + MemberId,
      {
        headers: new HttpHeaders(
          {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
          })
      });
  }
}
