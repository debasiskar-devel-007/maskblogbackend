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
  public cookies:any='';

  constructor(public router: Router, private cookieService: CookieService) {
    // this.cookieService.deleteAll();

   }

  ngOnInit() {

  }


      /**logout function start here**/
      logout() {
        // this.cookies=this.cookieService.getAll()
        // console.log(this.cookies)

        this.cookieService.deleteAll();

        // console.log(this.cookies)
        setTimeout(() => {
        this.cookieService.deleteAll();
          this.router.navigate(['/']);
        }, 1000);
      }
      /**logout function end here**/
    

}
