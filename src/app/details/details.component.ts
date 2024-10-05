import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { User } from '../model/user.model';
import { CommonService } from '../services/common.service';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  private destroy = new Subject<void>();
  userDetails: any = {};
  isValidMobile: boolean = false;
  showImageContainer: boolean = true;
  notFoundContainer: boolean = false;
  detailsContainer: boolean = true;
  constructor(private commonService: CommonService, private loginService: LoginService,private  router:Router) { }

  ngOnInit(): void {
  }

  public validateMobile(mobileNumber: string): void {
    const mobilePattern = /^[6-9]\d{9}$/;
    this.isValidMobile = mobilePattern.test(mobileNumber);
  }

  public getUserDetails(phone: string): void {
    if (phone === '') {
      return this.commonService.error("Please enter mobile number!")
    }
    this.loginService.getUserWithMobile(phone).pipe(takeUntil(this.destroy)).subscribe({
      next: response => {
        if (response && response.code == 200) {
          setTimeout(()=>{
            this.userDetails = response.data;
            this.detailsContainer = false;
            this.showImageContainer = false;
            this.commonService.success("User details fetched successfully")
          },1000)
         
        }
      },
      error: error => {
        this.userNotFoundError();
      }
    })
  }

  private userNotFoundError(): void {

    setTimeout(() => {
      this.notFoundContainer = true;
      this.showImageContainer = false;
      this.detailsContainer = true;
      this.commonService.error("User does not exist with mobile number")

    }, 1000)
  }

  public goBack():void{
    this.router.navigate(['/login'])
  }


}
