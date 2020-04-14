import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';
import { MetaService } from '@ngx-meta/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  public fromTitleName: any = 'Reset Password';
  public logo: any = './assets/images/logo.png';
  public serverUrl: any=environment["API_URL"];
  public addEndpoint: any = {
    endpoint:'resetpassword',
    source:'users'
  };
  constructor(public meta: MetaService) { 
        this.meta.setTitle('Virus Barrier Medical Face Mask Blog backend | Reset Password');
    this.meta.setTag('og:description', 'Virus Barrier Medical Face Mask Blog backend to keep medical professionals safe and protected against harmful viruses, bacteria, and other critical circumstances, while also tending to their comfort.');
    this.meta.setTag('twitter:description', 'Virus Barrier Medical Face Mask Blog backend to keep medical professionals safe and protected against harmful viruses, bacteria, and other critical circumstances, while also tending to their comfort.');

    this.meta.setTag('og:keyword', 'Virus Barrier Medical Face Mask Blog backend, Medical Face Mask Blog backend, Medical Face Mask Blog backend for Virus');
    this.meta.setTag('twitter:keyword', 'Virus Barrier Medical Face Mask Blog backend, Medical Face Mask Blog backend, Medical Face Mask Blog backend for Virus');

    this.meta.setTag('og:title', 'Virus Barrier Medical Face Mask Blog backend | Reset Password');
    this.meta.setTag('twitter:title', 'Virus Barrier Medical Face Mask Blog backend | Reset Password');
    this.meta.setTag('og:type', 'website');
    this.meta.setTag('og:url','https://mask-blog-backend.influxiq.com/');    
    this.meta.setTag('og:image', '../../assets/images/logo-fb.jpg');
    this.meta.setTag('twitter:image', '../../assets/images/logo-twitter.jpg');
  }

  ngOnInit() {
  }

}
