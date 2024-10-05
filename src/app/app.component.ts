import { ChangeDetectorRef, Component } from '@angular/core';
import { NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { CommonService } from './services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sample-app';
  loading: boolean = true;
  constructor(private router: Router,private cdRef:ChangeDetectorRef,private commonService:CommonService) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loading = true;
        this.commonService.loadSpinner();
      } else if (event instanceof NavigationEnd || event instanceof NavigationError) {
        // this.loading = false;
        setTimeout(() => {
          this.loading = false;
        }, 1000); 
        this.cdRef.detectChanges();
      }
    });
  }
}
