import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
// import { WINDOW } from '@ng-toolkit/universal';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public router: Router, private cookieService: CookieService) { }

  ngOnInit() {

  }


      /**logout function start here**/
      logout() {
        this.cookieService.deleteAll();
        this.cookieService.deleteAll('/');
        setTimeout(() => {
          //this.window.location.href = '/';
          //this.router.navigateByUrl('/home');
          this.router.navigate(['/']);
        }, 1000);
      }
      /**logout function end here**/
    

}
