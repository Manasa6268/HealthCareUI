import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { url } from '../models/url.model';
import { MemberDetails, MemberList, PhysicianAssign, PhysicianDetails, States, UserCredentials, UserTypes } from '../models/admin.model';
@Injectable({ providedIn: 'root' })
export class AdminService {

  public apiUrl: string;
  constructor(private http: HttpClient) {
    this.apiUrl = url;
  }
  login(cred: UserCredentials): Observable<string> {

    return this.http.post<any>(`${this.apiUrl}/auth/gettoken`, { userName: cred.userName, password: cred.password });
  }

  Signup(member: MemberDetails): Observable<string> {
    return this.http.post<any>(`${this.apiUrl}/admin/signup`,
      {
        "Id": 0,
        "Code": "",
        "FirstName": member.firstName,
        "LastName": member.lastName,
        "UserName": member.userName,
        "DOB": member.dob,
        "Address": member.address,
        "City": member.city,
        "State": member.state,
        "Email": member.email,
        "PhysicianName": member.physicianName,
        "CreatedDate": member.createdDate,
        "ModifiedDate": member.modifiedDate,
        "ModifiedBy": "",
        "Password": member.password,
        "UserType": member.userType
      },



    );
  }

  GetStates(): Observable<States[]> {
    return this.http.get<any>(`${this.apiUrl}/admin/states`);
  }

  GetUserTypes(): Observable<UserTypes[]> {
    return this.http.get<any>(`${this.apiUrl}/admin/usertypes`);
  }

  GetUserNames(): Observable<string[]> {
    return this.http.get<any>(`${this.apiUrl}/admin/usernames`);
  }

  GetEmails(): Observable<string[]> {
    return this.http.get<any>(`${this.apiUrl}/admin/mails`);
  }

  GetPhysicianNames(): Observable<PhysicianDetails[]> {
    return this.http.get<any>(`${this.apiUrl}/admin/phyisiciannames`);
  }
  //this.apiUrl + '/admin/getmembers?
  GetMembers(MemberId: string, FirstName: string, LastName: string, PhysicianName: string, ClaimId: string): Observable<MemberList[]> {
    return this.http.get<MemberList[]>(this.apiUrl + '/admin/GetMemberDetails?MemberId=' + MemberId + '&FirstName=' + FirstName + '&LastName=' + LastName + '&PhysicianName=' + PhysicianName + '&ClaimId=' + ClaimId,
      {
        headers: new HttpHeaders(
          {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
          })
      });
  }
  //`${this.apiUrl}/admin/assignphysician`
  AssignPhysician(physician: PhysicianAssign): Observable<string> {
    return this.http.post<any>(`${this.apiUrl}/admin/AssignPhysician`, { memberId: physician.memberId, physicianName: physician.physicianName, adminId: physician.adminId },
      {
        headers: new HttpHeaders(
          {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
          })
      });
  }
}
