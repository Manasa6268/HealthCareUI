import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { url } from '../models/url.model';
import { MemberDetails, States, UserCredentials, UserTypes } from '../models/admin.model';
@Injectable({ providedIn: 'root' })
export class AdminService {
  public apiUrl: string;
  constructor(private http: HttpClient) {
    this.apiUrl = url;
  }
  login(cred: UserCredentials): Observable<string> {
    return this.http.post<any>(`${this.apiUrl}/api/GetToken`, { userName: cred.userName, password: cred.password });
  }
  Signup(member: MemberDetails): Observable<string> {
    return this.http.post<any>(`${this.apiUrl}/admin/signup`,
      {
        "Id": 0,
        "Code": "",
        "FirstName": member.FirstName,
        "LastName": member.LastName,
        "UserName": member.UserName,
        "DOB": member.DOB,
        "Address": member.Address,
        "City": member.City,
        "State": member.State,
        "Email": member.Email,
        "PhysicianName": member.PhysicianName,
        "CreatedDate": member.CreatedDate,
        "ModifiedDate": member.ModifiedDate,
        "ModifiedBy": "",
        "Password": member.Password,
        "UserType": member.UserType
      },



    );
  }
  GetStates(): Observable<States[]> {
    return this.http.get<any>(`${this.apiUrl}/states`);
  }
  GetUserTypes(): Observable<UserTypes[]> {
    return this.http.get<any>(`${this.apiUrl}/usertypes`);
  }
  GetUserNames(): Observable<string[]> {
    return this.http.get<any>(`${this.apiUrl}/usernames`);
  }
  GetEmails(): Observable<string[]> {
    return this.http.get<any>(`${this.apiUrl}/getmails`);
  }
}
