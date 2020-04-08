import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { CookieService } from 'ngx-cookie-service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {
  public blogDataList: any = [];
  public value: any = [];
  public datasource:any;
  blogListConfig: any;
  loader: boolean = false;
 public tableName:any="blogs";
  sortdata: any = {
    "type": 'desc',
    "field": 'priority',
    "options": ['author', 'blogcategory', 'blogtitle', 'priority']
  };
  datacollection: any = 'getblogmanagementlistdata';
  date_search_source_count: any = 0;
  limitcond: any = {
    "limit": 10,
    "skip": 0,
    "pagecount": 1
  };
  listArray_skip: ["_id", "userId", "created_at", "updated_at", "image", "metatitle", "metadesc", "description", "credentials", "blogs_file", "blogs_image", "blogtitle_search", "author_search", "video", "blogcat", "profile_picture", "tagsearch", "featured"]
  listArray_modify_header: {
    "blogtitle": "Blog Title", "description html": "Description", "date added": "Date", "profile picture": "Profile Picture", "tags": "Tags",
    "priority": "Priority", "status": "Status", "parentcategoryname": "Parent Category Name",
    "author": "Author", "blogcat": "Blog Category", "date": "Date", "blogcategory": "Blog Category",
    "featured search": "Featured", "website": "Website"
  }
  search_settings: {
    textsearch: [{ label: "Search By Blog Title", field: 'blogtitle_search' },{ label: "Search By Author", field: 'author_search' },{ label: "Search By Tags", field: 'tagsearch' }],

    selectsearch: [
      { label: 'Status', field: 'status', values: [{ val: 1, name: "Active" }, { val: 0, name: 'Inactive' }]},{label:"Search By Blog Category",field:'blogcategory',values:""},
      {
        label: 'Search By Blog Featured', field: 'featured', values: [{ val: 1, name: "Yes" }, { val: 0, name: 'No' }]
      },
      {
        label: 'Search By Blog Website', field: 'website', values: [{ val: 1, name: "Mask Blog 1" }, { val: 2, name: 'Mask Blog 2' },{val:3,name:"Mask Blog 3"}]
      }
    ]    
  };
  statusarr: [{ val: 1, name: "Active" }, { val: 0, name: 'Inactive' }];
  public jwttoken:any;
  apiurl:any=environment.API_URL1;
  public deleteEndPoint:any="deletesingledata";
  public view:any="blogs_desc_priority";
  public listEndPoint:any="datalist";
  constructor(public activatedRoute: ActivatedRoute,public httpService:HttpService,public cookieService:CookieService) { 
    this.jwttoken=this.cookieService.get('jwtToken');
    console.log("dsdsd",this.jwttoken);
  }

  ngOnInit() {
    this.datasource = '';
    let endpoint='getblogmanagementlistdata';
    let endpointc='getblogmanagementlistdata-count';
    let data:any={
        "condition":{
            "limit":10,
            "skip":0
        },
        sort:{
          "type":'desc',
          "field":'priority'
      }

    }
        this.httpService.getDataforAdminListApi1(endpointc, data).subscribe((res:any) => {
            console.log('in constructor',res);
            // console.log(result);
            this.date_search_source_count =res.count;
            //console.warn('blogData c',res);

        }, error => {
            console.log('Oooops!');
        });

        this.httpService.getDataforAdminListApi1(endpoint,data).subscribe((res:any) => {
          console.log('in constructor',res);
           
            this.blogDataList =res.results.res;

        }, error => {
            console.log('Oooops!');
        });

    this.activatedRoute.data.forEach(res => {
      let result: any = res;
      this.blogDataList = result.adminlist.res;
      console.log(this.blogDataList)

    })
  }

}
