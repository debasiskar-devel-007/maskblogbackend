import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

    /************** lib list setup start here *************/
    public blogListConfig:any = {

    apiBaseUrl: "https://hntm6xe6of.execute-api.us-east-1.amazonaws.com/dev/api1/",
    endpoint: "https://hntm6xe6of.execute-api.us-east-1.amazonaws.com/dev/api1/getbloglistdata",
    endpointc: "https://hntm6xe6of.execute-api.us-east-1.amazonaws.com/dev/api1/getbloglistdata-count",
      // apiBaseUrl: environment.apiBaseUrl,

      listEndPoint: "datalist",
      datasource: "",
      tableName: "blog_category",
      updateurl: "addorupdatedata",
      editUrl: "blog/category/edit",
      jwtToken: "",
      deleteEndPoint: "deletesingledata",
      addLink: "/blog/category/add",
      view: "blog_category"
      
    }
  constructor(public activatedRoute : ActivatedRoute,public cookieService : CookieService) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(resolveData => {
      this.blogListConfig.datasource = resolveData.trainingdata.res;
      this.blogListConfig.jwtToken = this.cookieService.get('jwtToken');     
    });
  }

}
