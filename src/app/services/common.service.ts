import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(public toastr: ToastrService, public router: Router, public spinner: NgxSpinnerService) { }

  public error(error: any) {
    this.toastr.error(error);
  }
  public success(error: any) {
    this.toastr.success(error);
  }

  public handleError(error: any): void {
    let message = 'Something Went Wrong; Please Try Again.';
    if (error && error.message) {
      this.error(error.message);
    }
    else if (error) {
      this.error(error);
    }
    else {
      this.error(message);
    }
  }

  public loadSpinner(): void {
    this.spinner.show(undefined, {
      type: 'ball-clip-rotate',
      bdColor: 'rgba(51,51,51,0.8)',
      fullScreen: true,
      color: 'fff',
      size: 'medium'
    })
  }

  public stopSpinner():void {
    this.spinner.hide();
  }

}
