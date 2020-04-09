import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { HttpService } from '../../services/http.service';
import {environment} from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {
   public value:any=[];
  public status: any = [{val: 1, name: 'Active'}, {val: 0, name: 'Inactive'}];

   // use for status search
   statusarray: any = [{val: 1, name: 'Active'}, {val: 0, name: 'Inactive'}]; 


  //  Example like this
  editroute: any = 'admin/edit';

  datasource: any; 
  adminDataList:any=[];


  // use for Table Header modification 

  // Like Table head name is " firstname" => "First Name"
  modify_header_array: any = {
    "blogtitle": "Blog Title", "description html": "Description","date added":"Date","profile picture":"Profile Picture","tags":"Tags",
    "priority": "Priority", "status": "Status", "parentcategoryname": "Parent Category Name",
    "author": "Author","blogcat":"Blog Category","date":"Date","blogcategory":"Blog Category",
    "featured search":"Featured","website":"Website"
  };

//   api url from environment
  apiurl:any=environment.API_URL1



    // use for Table Detail Field Skip 
  adminDataList_skip: any = ["_id", "userId", "created_at", "updated_at", "image", "metatitle", "metadesc", "description", "credentials", "blogs_file", "blogs_image","blogtitle_search","author_search","video","blogcat","profile_picture","tagsearch","featured","description_html","blogcat","created_at","profile_picture","tagsearch"];

  adminDataList_detail_skip:any=['_id','password','updated_at','id',"description_html","blogcat","created_at","profile_picture","tagsearch"]


   // use for Table Detail inside the modal image path 
//    adminDataList_skip_detail_datatype: any = [{
//       key: "images",
//       value: 'image',
//       fileurl: "http://18.222.26.198/upload/brandimages/"             // Image path 
//   }];

  // updateendpoint is use for data update endpoint
  updateendpoint = 'addorupdatedata';

  // deleteendpoint is use for data delete endpoint
  deleteendpoint = 'deletesingledata';

  // this is a database collection name
  tablename = 'blogs';

  // searchendpoint is use for data search endpoint
  searchendpoint = 'datalist';

  // use for click to another page routing path
  click_to_add_ananother_page = '/adminlist';



  // date_search_endpoint is use for date search endpoint
  date_search_endpoint: any='datalist';
  // send basic limit data
  limitcond:any={
    "limit":10,
    "skip":0,
    "pagecount":1
};
// send basic sort data
sortdata:any={
  "type":'desc',
  "field":'priority',
  "options":['author','blogcategory','blogtitle','priority']
};

  // this is a database collection or view name
  date_search_source: any='blogs_desc_priority';
  // datacollection
  datacollection: any='getblogmanagementlistdata';
  //source count
  date_search_source_count: any=0;


  search_settings:any={
    textsearch: [{ label: "Search By Blog Title", field: 'blogtitle_search' },{ label: "Search By Author", field: 'author_search' },{ label: "Search By Tags", field: 'tagsearch' }],

    selectsearch: [
      { label: 'Status', field: 'status', values: [{ val: 1, name: "Active" }, { val: 0, name: 'Inactive' }]},{label:"Search By Blog Category",field:'blogcategory',values:this.value},
      {
        label: 'Search By Blog Featured', field: 'featured', values: [{ val: 1, name: "Yes" }, { val: 0, name: 'No' }]
      },
      {
        label: 'Search By Blog Website', field: 'website', values: [{ val: 1, name: "Mask Blog 1" }, { val: 2, name: 'Mask Blog 2' },{val:3,name:"Mask Blog 3"}]
      }
    ]

     

  };

  // this is search block 
  adminDataList_detail_datatype:any;

  custom_link:any;
 
  brandarray: any = [];
  notpendingapplication_view: any = [];
  adminlist: any = [];

  editroute1:any='modeledit';
    jwttoken:any;
  


  constructor(public activatedRoute:ActivatedRoute,public httpService:HttpService,private cookieService: CookieService) {
    //   this.cookieService.set('jwttoken','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJleHAiOjE1ODU2NTM1MzksImlhdCI6MTU4NTU2NzEzOX0.ErmNEt1IOnbKQMfTveF2Tt0PY0TprflzQ1DngaGGUhA');
      this.jwttoken=this.cookieService.get('jwtToken');


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
        this.httpService.getDataforBlogListApi1(endpointc, data).subscribe((res:any) => {
            // console.log('in constructor');
            // console.log(result);
            this.date_search_source_count =res.count;
            //console.warn('blogData c',res);

        }, error => {
            console.log('Oooops!');
        });

        this.httpService.getDataforBlogListApi1(endpoint,data).subscribe((res:any) => {
           
            this.adminDataList =res.results.res;

        }, error => {
            console.log('Oooops!');
        });




        this.activatedRoute.data.forEach(res=>{
            let result:any=res;
            this.adminDataList=result.adminlist.res;
            for (let i in this.adminDataList) {
              this.value.push(
                { 'name': this.adminDataList[i].blogcategory, val: this.adminDataList[i].blogcategory }
                );
            
            }
            // console.log(this.adminDataList)    
        
        })


  }

}
