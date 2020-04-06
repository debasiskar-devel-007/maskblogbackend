import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { HttpService } from '../../../../services/http.service';
import {environment} from '../../../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-list-admin',
  templateUrl: './list-admin.component.html',
  styleUrls: ['./list-admin.component.css']
})
export class ListAdminComponent implements OnInit {

   
  public status: any = [{val: 1, name: 'Approve'}, {val: 4, name: 'Decline'}, {val: 3, name: 'Lock'}];

   // use for status search
   statusarray: any = [{val: 1, name: 'Approve'}, {val: 4, name: 'Decline'}, {val: 3, name: 'Lock'}]; 


  //  Example like this
  editroute: any = 'admin/edit';

  datasource: any; 
  adminDataList:any=[];


  // use for Table Header modification 

  // Like Table head name is " firstname" => "First Name"
  modify_header_array: any = {
      'firstname': "First Name",
      'email': 'Email Id',
      'lastname': 'Last Name',
      'name': "Full Name",
      'phone':"Phone Number",
      'state':'State',
      'city':'City',
      'zip':"Zip Code"
  };

//   api url from environment
  apiurl:any=environment.API_URL2



    // use for Table Detail Field Skip 
  adminDataList_skip: any = ['_id', 'name','type', 'password','created_at','updated_at','id'];


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
  tablename = 'data_user';

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
    "field":'firstname',
    "options":['firstname','email','lastname','email','state','city']
};

  // this is a database collection or view name
  date_search_source: any='admin_blog_list';
  // datacollection
  datacollection: any='getadminlistdata';
  //source count
  date_search_source_count: any=0;


  search_settings:any={

      datesearch:[{startdatelabel:"Start Date",enddatelabel:"End Date",submit:"Search",  field:"created_at"}],   // this is use for  date search

      selectsearch:[{ label: 'Search By Status', field: 'status', values: this.status }], // this is use for  select search

       textsearch:[{label:"Search By name",field:'firstname'},{label:"Search By Email",field:'email'}],  // this is use for  text search

       // this is use for  Autocomplete search
    //    search:[{label:"Search By status",field:this.status}]     

  };

  // this is search block 



  brandarray: any = [];
  notpendingapplication_view: any = [];
  adminlist: any = [];

  editroute1:any='modeledit';
    jwttoken:any;
  
//   status_gretterthan_zero_skip: any= ['_id','username','phone','city','state','ethnicity','height','haircolor','eyecolor','weight','bust','waist','hips','slim','toned','tattoos','athletic','piercings','retail','voluptuous','promotions','sales','descriptionbox','facebooklink','twitterlink','instagramlink','modelmayhemlink','type','images'];
//   status_gretterthan_zero_modify_header: any = { 'dateformat': 'Date','status':'Status','email':'Email', 'name':'Full Name', 'bodytype' : 'Bodytype', 'shatterblok agreement date': 'Shatterblok Agreement Date', 'audiodeadline agreement date': 'Audiodeadline Agreement Date' };
//   status_gretterthan_zero_detail_skip:any=['_id','email','name','type','status'];
  // status_gretterthan_zero_detail_datatype:any=[{key:"images",value:'image',fileurl:this.httpService }];


  constructor(public activatedRoute:ActivatedRoute,public httpService:HttpService,private cookieService: CookieService) {
    //   this.cookieService.set('jwttoken','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJleHAiOjE1ODU2NTM1MzksImlhdCI6MTU4NTU2NzEzOX0.ErmNEt1IOnbKQMfTveF2Tt0PY0TprflzQ1DngaGGUhA');
      this.jwttoken=this.cookieService.get('jwtToken');


  }

  ngOnInit() {

    this.datasource = '';
    let endpoint='getadminlistdata';
    let endpointc='getadminlistdata-count';
    let data:any={
        "condition":{
            "limit":10,
            "skip":0
        },
    sort:{
        "type":'desc',
        "field":'firstname'
    }

    }
        this.httpService.getDataforAdminList(endpointc, data).subscribe((res:any) => {
            // console.log('in constructor');
            // console.log(result);
            this.date_search_source_count =res.count;
            //console.warn('blogData c',res);

        }, error => {
            console.log('Oooops!');
        });

        this.httpService.getDataforAdminList(endpoint,data).subscribe((res:any) => {
           
            this.adminDataList =res.results.res;

        }, error => {
            console.log('Oooops!');
        });




        this.activatedRoute.data.forEach(res=>{
            let result:any=res;
            this.adminDataList=result.adminlist.res; 
            // console.log(this.adminDataList)    
        
        })


  }

}
