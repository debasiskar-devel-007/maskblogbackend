import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MetaService } from '@ngx-meta/core';

@Component({
  selector: 'app-list-blogs',
  templateUrl: './list-blogs.component.html',
  styleUrls: ['./list-blogs.component.css']
})
export class ListBlogsComponent implements OnInit {
  //Blogs Lib List
  public blogListConfig: any = {

    apiBaseUrl: "https://hntm6xe6of.execute-api.us-east-1.amazonaws.com/dev/api1/",
    endpoint: "https://hntm6xe6of.execute-api.us-east-1.amazonaws.com/dev/api1/getblogmanagementlistdata",
    endpointc: "https://hntm6xe6of.execute-api.us-east-1.amazonaws.com/dev/api1/getblogmanagementlistdata-count",

    // apiBaseUrl: environment.apiBaseUrl,

    listEndPoint: "datalist",
    datasource: "",
    tableName: "blogs",
    updateurl: "addorupdatedata",
    editUrl: "blog-management/edit",
    jwtToken: "",
    deleteEndPoint: "deletesingledata",
    addLink: "blog-management/add",
    view: "blogs_desc_priority"

  }
  constructor(public meta: MetaService, public activatedRoute:ActivatedRoute,public cookieService:CookieService) {
        this.meta.setTitle('Virus Barrier Medical Face Mask Blog backend');
    this.meta.setTag('og:description', 'Virus Barrier Medical Face Mask Blog backend to keep medical professionals safe and protected against harmful viruses, bacteria, and other critical circumstances, while also tending to their comfort.');
    this.meta.setTag('twitter:description', 'Virus Barrier Medical Face Mask Blog backend to keep medical professionals safe and protected against harmful viruses, bacteria, and other critical circumstances, while also tending to their comfort.');

    this.meta.setTag('og:keyword', 'Virus Barrier Medical Face Mask Blog backend, Medical Face Mask Blog backend, Medical Face Mask Blog backend for Virus');
    this.meta.setTag('twitter:keyword', 'Virus Barrier Medical Face Mask Blog backend, Medical Face Mask Blog backend, Medical Face Mask Blog backend for Virus');

    this.meta.setTag('og:title', 'Virus Barrier Medical Face Mask Blog backend');
    this.meta.setTag('twitter:title', 'Virus Barrier Medical Face Mask Blog backend');
    this.meta.setTag('og:type', 'website');
    this.meta.setTag('og:url','https://mask-blog-backend.influxiq.com/');    
    this.meta.setTag('og:image', '../../assets/images/logo-fb.jpg');
    this.meta.setTag('twitter:image', '../../assets/images/logo-twitter.jpg');
   }

  ngOnInit() {
    this.activatedRoute.data.subscribe((resolveData:any) => {
      this.blogListConfig.datasource = resolveData.blogList.res;
     this.blogListConfig.jwtToken = this.cookieService.get('jwtToken');
    //  this.blogListConfig.jwtToken ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJleHAiOjE1ODYxNzk3MzcsImlhdCI6MTU4NjA5MzMzN30.62F_1FAIekcBiBYaVnAFvEMeLN1Z5_CP3lJZcgEnfe4"

   });
  }

}
