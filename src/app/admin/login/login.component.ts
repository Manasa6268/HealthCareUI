import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserCredentials } from 'src/app/models/admin.model';
import { AdminService } from 'src/app/services/admin.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  passwordpattern: string = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,15}$";
  loading = false;
  submitted = false;
  role: string = '';
  returnUrl: string = '';
  message: string = "";
  token: string = "";
  cred: UserCredentials = {
    userName: '',
    password: ''
  };
  UserId: number = 0;
  tokenPayload: any;

  constructor(private router: Router, private adminService: AdminService, private jwtHelper: JwtHelperService,
    private toaster: ToastrService) { }

  ngOnInit(): void {

  }
  signup() {
    this.router.navigate(['/register']);
  }
  onSubmit() {

    // this.adminService.logout();
    this.loading = true;
    if (this.cred.userName != '' && this.cred.userName != '') {
      this.adminService.login(this.cred)
        .subscribe(
          data => {
            this.token = data;
            localStorage.setItem('token', this.token);
            this.tokenPayload = this.jwtHelper.decodeToken(this.token);
            this.UserId = this.tokenPayload.sub;
            localStorage.setItem('userid', (this.UserId).toString())
            localStorage.setItem('Name', this.cred.userName);
            this.role = this.tokenPayload.Role
            localStorage.setItem('role', this.tokenPayload.Role);
            //this.router.navigate(['/homepage']);
            this.toaster.success(this.role + '  Login Successfull!')

          },
          error => {
            this.toaster.error('Login Failed! Please enter valid username and password')
            this.loading = false;

          });
    }
    this.submitted = true;
  }
}
