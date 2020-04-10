import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';
import { MetaService } from '@ngx-meta/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public logo: any = './assets/images/logo.png';
  public fromTitle: any = "Login";    // This is a From Title
  public fullUrl: any = environment["API_URL"];  // server url
  public endpoint: any = "login";
  public buttonName:any= 'Login';
  public defaultLoginUrl = '/';

  loading: boolean;
 



  public signUpRouteingUrl: any = {
    "path": "",
    "buttonName": "",
    "customLink": "/",
    "customURl": ""
  };
  public forgetRouteingUrl: any = {
    "path": "",
    "buttonName": "Forgot your password ?",
    "customLink": "/forget-password",
  };

  public routerStatus: any;
  constructor(public meta: MetaService) { 

    this.meta.setTitle('Virus Barrier Medical Face Mask Blog backend | Login');
    this.meta.setTag('og:description', 'Virus Barrier Medical Face Mask Blog backend to keep medical professionals safe and protected against harmful viruses, bacteria, and other critical circumstances, while also tending to their comfort.');
    this.meta.setTag('twitter:description', 'Virus Barrier Medical Face Mask Blog backend to keep medical professionals safe and protected against harmful viruses, bacteria, and other critical circumstances, while also tending to their comfort.');

    this.meta.setTag('og:keyword', 'Virus Barrier Medical Face Mask Blog backend, Medical Face Mask Blog backend, Medical Face Mask Blog backend for Virus');
    this.meta.setTag('twitter:keyword', 'Virus Barrier Medical Face Mask Blog backend, Medical Face Mask Blog backend, Medical Face Mask Blog backend for Virus');

    this.meta.setTag('og:title', 'Virus Barrier Medical Face Mask Blog backend | Login');
    this.meta.setTag('twitter:title', 'Virus Barrier Medical Face Mask Blog backend | Login');
    this.meta.setTag('og:type', 'website');
    this.meta.setTag('og:url','https://mask-blog-backend.influxiq.com/');    
    this.meta.setTag('og:image', '../../assets/images/logo-fb.jpg');
    this.meta.setTag('twitter:image', '../../assets/images/logo-twitter.jpg');

    
    this.routerStatus = {           // this is use for if login succcess then navigate which page 
      "data": [
        {
          "type": "admin",
          "routerNav": "dashboard"
        },
        {
          "type": "rep",
          "routerNav": "home"
        },
        {
          "type": "model",
          "routerNav": "modelDashbord"
        }
      ]
    }
  }

  ngOnInit() {
  }

}
