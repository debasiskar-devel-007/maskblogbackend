import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';

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
  public defaultLoginUrl = '/login';

  loading: boolean;
 



  public signUpRouteingUrl: any = {
    "path": "",
    "buttonName": "Not registered? Request Sign Up Here",
    "customLink": "/",
    "customURl": ""
  };
  public forgetRouteingUrl: any = {
    "path": "",
    "buttonName": "Forgot your password ?",
    "customLink": "/forget-password",
  };

  public routerStatus: any;
  constructor() { 
    this.routerStatus = {           // this is use for if login succcess then navigate which page 
      "data": [
        {
          "type": "admin",
          "routerNav": "admin/list"
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