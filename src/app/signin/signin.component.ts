import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { CommonService } from '../services/common.service';
import { User } from '../model/user.model';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit, OnDestroy {

  public loginForm: FormGroup = new FormGroup({});
  private destroy = new Subject<void>();

  loading: boolean = false;
  isLoading: boolean = false;

  loginModel: User = {};
  hidePassword: boolean = true;

  constructor(private formBuilder: FormBuilder, private commonService: CommonService, private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
    this.buildForm();
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  private buildForm(): void {

    this.loginForm = this.formBuilder.group({

      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [
        Validators.required,
        Validators.maxLength(10),
        Validators.pattern('^[6-9][0-9]{9}$')
      ]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  public userLogin(): void {
    this.loginModel.userName = this.loginForm.get("name")?.value;
    this.loginModel.email = this.loginForm.get("email")?.value;
    this.loginModel.phone = this.loginForm.get("phone")?.value;
    this.loginModel.password = this.loginForm.get("password")?.value;
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);

    this.loginService.userLogin(this.loginModel).pipe(takeUntil(this.destroy)).subscribe({
      next: response => {
        if (response && response.code == 201) {
          setTimeout(() => {
            this.commonService.success("Login Success");
          }, 500);
          this.router.navigate(['/find']);
        }
      },
      error: error => {
        if (error?.status == 0) {
          this.commonService.handleError("Something went wrong!");
        } else {
          this.commonService.error("User already Exists with Mobile");
        }
      }
    })


  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

}
