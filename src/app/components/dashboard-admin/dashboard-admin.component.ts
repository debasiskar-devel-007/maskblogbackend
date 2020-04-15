import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { MetaService } from '@ngx-meta/core';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {
  public allData: any = [];
  public value: any = [];
  public websites:any={
    "website1":"",
    "website2":"",
    "website3":""
  }
  public total_blogs:any;
  public status: any = [{ val: 1, name: 'Active' }, { val: 0, name: 'Inactive' }];

  // use for status search
  statusarray: any = [{ val: 1, name: 'Active' }, { val: 0, name: 'Inactive' }];


  //  Example like this
  editroute: any = 'blog-management/edit';

  datasource: any;
  adminDataList: any = [];


  // use for Table Header modification 

  // Like Table head name is " firstname" => "First Name"
  modify_header_array: any = {
    "blogtitle": "Blog Title", "description html": "Description", "date added": "Date", "profile picture": "Profile Picture", "tags": "Tags",
    "priority": "Priority", "status": "Status", "parentcategoryname": "Parent Category Name",
    "author": "Author", "blogcat": "Blog Category", "date": "Date", "blogcategory": "Blog Category",
    "featured search": "Featured", "website": "Website"
  };

  //   api url from environment
  apiurl: any = environment.API_URL1



  // use for Table Detail Field Skip 
  adminDataList_skip: any = ["_id", "userId", "created_at", "updated_at", "image", "metatitle", "metadesc", "description", "credentials", "blogs_file", "blogs_image", "blogtitle_search", "author_search", "video", "blogcat", "profile_picture", "tagsearch", "featured", "description_html", "blogcat", "created_at", "profile_picture", "tagsearch", "author"];

  adminDataList_detail_skip: any = ['_id', 'password', 'updated_at', 'id', "description_html", "blogcat", "created_at", "profile_picture", "tagsearch"]


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
  date_search_endpoint: any = 'datalist';
  // send basic limit data
  limitcond: any = {
    "limit": 10,
    "skip": 0,
    "pagecount": 1
  };
  // send basic sort data
  sortdata: any = {
    "type": 'desc',
    "field": 'priority',
    "options": ['author', 'blogcategory', 'blogtitle', 'priority']
  };

  // this is a database collection or view name
  date_search_source: any = 'blogs_desc_priority';
  // datacollection
  datacollection: any = 'getblogmanagementlistdata';
  //source count
  date_search_source_count: any = 0;


  search_settings: any = {
    textsearch: [{ label: "Search By Blog Title", field: 'blogtitle_search' }, { label: "Search By Tags", field: 'tagsearch' }],

    selectsearch: [
      { label: 'Status', field: 'status', values: [{ val: 1, name: "Active" }, { val: 0, name: 'Inactive' }] }, { label: "Search By Blog Category", field: 'blogcategory', values: this.value },
      {
        label: 'Search By Blog Featured', field: 'featured', values: [{ val: 1, name: "Yes" }, { val: 0, name: 'No' }]
      },
      {
        label: 'Search By Blog Website', field: 'website', values: [{ val: "Mask Blog 1", name: "Mask Blog 1" }, { val: "Mask Blog 2", name: 'Mask Blog 2' }, { val: "Mask Blog 3", name: "Mask Blog 3" }]
      }
    ]



  };

  // this is search block 
  adminDataList_detail_datatype: any;

  custom_link: any;

  brandarray: any = [];
  notpendingapplication_view: any = [];
  adminlist: any = [];

  editroute1: any = 'modeledit';
  jwttoken: any;

 public user_cookies:any;

  constructor(public meta: MetaService, public activatedRoute: ActivatedRoute, public httpService: HttpService, private cookieService: CookieService) {
    this.countfunction();
    this.meta.setTitle('Virus Barrier Medical Face Mask Blog backend | Blog backend');
    this.meta.setTag('og:description', 'Virus Barrier Medical Face Mask Blog backend to keep medical professionals safe and protected against harmful viruses, bacteria, and other critical circumstances, while also tending to their comfort.');
    this.meta.setTag('twitter:description', 'Virus Barrier Medical Face Mask Blog backend to keep medical professionals safe and protected against harmful viruses, bacteria, and other critical circumstances, while also tending to their comfort.');

    this.meta.setTag('og:keyword', 'Virus Barrier Medical Face Mask Blog backend, Medical Face Mask Blog backend, Medical Face Mask Blog backend for Virus');
    this.meta.setTag('twitter:keyword', 'Virus Barrier Medical Face Mask Blog backend, Medical Face Mask Blog backend, Medical Face Mask Blog backend for Virus');

    this.meta.setTag('og:title', 'Virus Barrier Medical Face Mask Blog backend | Blog backend');
    this.meta.setTag('twitter:title', 'Virus Barrier Medical Face Mask Blog backend | Blog backend');
    this.meta.setTag('og:type', 'website');
    this.meta.setTag('og:url', 'https://mask-blog-backend.influxiq.com/');
    this.meta.setTag('og:image', '../../assets/images/logo-fb.jpg');
    this.meta.setTag('twitter:image', '../../assets/images/logo-twitter.jpg');
    this.jwttoken = this.cookieService.get('jwtToken');
    let allcookies: any;
    allcookies = cookieService.getAll();
    this.user_cookies = JSON.parse(allcookies.user_details);
    console.log("cookies data",this.user_cookies.firstname,this.user_cookies.lastname);
    this.datasource = '';
    let endpoint = 'getblogmanagementlistdata';
    let endpointc = 'getblogmanagementlistdata-count';
    let data: any = {
      "condition": {
        "limit": 10,
        "skip": 0
      },
      sort: {
        "type": 'desc',
        "field": 'priority'
      }

    }
    this.httpService.getDataforBlogListApi1(endpointc, data).subscribe((res: any) => {
      // console.log('in constructor');
      // console.log(result);
      this.date_search_source_count = res.count;
      //console.warn('blogData c',res);

    }, error => {
      console.log('Oooops!');
    });

    this.httpService.getDataforBlogListApi1(endpoint, data).subscribe((res: any) => {

      this.adminDataList = res.results.res;

    }, error => {
      console.log('Oooops!');
    });




    this.activatedRoute.data.forEach(res => {
      let result: any = res;
      // this.adminDataList=result.adminlist.res;
      this.allData = result.adminlist.res;
      for (let i in this.allData) {
        this.value.push(
          { 'name': this.allData[i].blogcategory, val: this.allData[i].blogcategory }
        );

      }
      // console.log(this.adminDataList)    

    })


  }




  ngOnInit() {
  }
  countfunction() {
   let endpoint : any="blogs-count";
   this.httpService.getDataForEndpointApi1(endpoint).subscribe((response:any)=>{
     if(response.status=='success'){
       this.websites.website1=response.website1[0].blog_count;
       this.websites.website2=response.website2[0].blog_count;
       this.websites.website3=response.website3[0].blog_count;
       this.total_blogs = response.total_blogs;
       
     }
   }); 
  }


}
