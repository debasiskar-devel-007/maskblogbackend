import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  public fromTitleName: any = 'Reset From';
  public logo: any = './assets/images/logo.png';
  public serverUrl: any=environment["API_URL"];
  public addEndpoint: any = {
    endpoint:'resetpassword',
    source:'users'
  };
  constructor() { }

  ngOnInit() {
  }

}
