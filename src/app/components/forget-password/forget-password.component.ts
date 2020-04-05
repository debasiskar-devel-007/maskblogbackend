import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';

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
  constructor() { }

  ngOnInit() {
  }

}
