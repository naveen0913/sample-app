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
    console.log(this.loginModel);

    // this.loadSpinner();
    this.loginService.userLogin(this.loginModel).pipe(takeUntil(this.destroy)).subscribe({
      next: response => {
        if (response.code == 201) {
          this.commonService.success("Login Success");
          this.router.navigate(['/find']);
        } else if (response.code == 409) {
          this.commonService.handleError(response.message);
        } else {
          this.commonService.handleError("Something went wrong!");
        }
      }, error: error => {
        this.commonService.error(error);
      }
    })


  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

}
