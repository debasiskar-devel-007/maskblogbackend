import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';
import { MetaService } from '@ngx-meta/core';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  public logo: any = './assets/images/logo.png';
  public fromTitle: any = 'FORGOTTEN PASSWORD'
    // public signUpRouteingUrl: any = 'sign-up';
  public serverUrl:any =environment["API_URL"];  // server url
  ;
  public addEndpoint: any = {
    endpoint:'forgetpassword'
  };
  public loginRouteingUrl: any = {
    // "path":"login",
    "path":"",
    "buttonName":"Login",
    "customLink":"/login",
    "customURl":""
  };
  public signUpRouteingUrl: any = {
    // "path":"sign-up",
    "path":"",
    "buttonName":"Sign Up",
    "customLink":"",
    "customURl":""
  };
  public buttonName: any = 'Reset Password';

  public domainUrl: any = 'http://localhost:6601/reset-password';
  constructor(public meta: MetaService) {
        this.meta.setTitle('Virus Barrier Medical Face Mask Blog backend | Forget Password');
    this.meta.setTag('og:description', 'Virus Barrier Medical Face Mask Blog backend to keep medical professionals safe and protected against harmful viruses, bacteria, and other critical circumstances, while also tending to their comfort.');
    this.meta.setTag('twitter:description', 'Virus Barrier Medical Face Mask Blog backend to keep medical professionals safe and protected against harmful viruses, bacteria, and other critical circumstances, while also tending to their comfort.');

    this.meta.setTag('og:keyword', 'Virus Barrier Medical Face Mask Blog backend, Medical Face Mask Blog backend, Medical Face Mask Blog backend for Virus');
    this.meta.setTag('twitter:keyword', 'Virus Barrier Medical Face Mask Blog backend, Medical Face Mask Blog backend, Medical Face Mask Blog backend for Virus');

    this.meta.setTag('og:title', 'Virus Barrier Medical Face Mask Blog backend | Forget Password');
    this.meta.setTag('twitter:title', 'Virus Barrier Medical Face Mask Blog backend | Forget Password');
    this.meta.setTag('og:type', 'website');
    this.meta.setTag('og:url','https://mask-blog-backend.influxiq.com/');    
    this.meta.setTag('og:image', '../../assets/images/logo-fb.jpg');
    this.meta.setTag('twitter:image', '../../assets/images/logo-twitter.jpg');
   }

  ngOnInit() {
  }

}
