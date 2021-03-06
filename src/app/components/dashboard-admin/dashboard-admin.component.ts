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
  public ipwiseblogdata:any=[];
  public allData: any = [];
  public value: any = [];
  public websites:any={
    "website1":"",
    "website2":"",
    "website3":"",
    "inactiveBlogs":""
  }
  public visitor_count:any={
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

  ipBlogDataList_modify_header:any={
    " id ":"ip","visitor added date":"Added Date"
  };
  //   api url from environment
  apiurl: any = environment.API_URL1



  // use for Table Detail Field Skip 
  adminDataList_skip: any = ["_id", "userId", "created_at", "updated_at", "image", "metatitle", "metadesc", "description", "credentials", "blogs_file", "blogs_image", "blogtitle_search", "author_search", "video", "blogcat", "profile_picture", "tagsearch", "featured", "description_html", "blogcat", "created_at", "profile_picture", "tagsearch", "author","maskblog1","maskblog2","maskblog3","tags_search"];


  ipBlogDataList_skip:any=["city_search","country_search","region_search","timezone_search","date_search"];

  adminDataList_detail_skip: any = ['_id', 'password', 'updated_at', 'id', "description_html", "blogcat", "created_at", "profile_picture", "tagsearch","featured","blogtitle_search","author","featured_search","author_search","maskblog1","maskblog2","maskblog3","tags_search"]
  blogdatabyip_detail_skip:any=["city_search","country_search","region_search","timezone_search"];


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
  limitcond_ip: any = {
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
  sortdata_by_ip:any={
    "type": 'desc',
    "field": 'blogtitle',
    "options": []
  };

  // this is a database collection or view name
  date_search_source: any = 'blogs_desc_priority';
  date_search_source_ip: any = 'blogs_by_ip_desc_blogtitle';
  // datacollection
  datacollection: any = 'getblogmanagementlistdata';
  datacollection_ip: any = 'getblogipdata';
  //source count
  date_search_source_count: any = 0;
  date_search_source_count_ip: any = 0;
  public authval:any= [];

  search_settings: any = {
    textsearch: [{ label: "Search By Blog Title", field: 'blogtitle_search' }],

    selectsearch: [
      { label: 'Status', field: 'status', values: [{ val: 1, name: "Active" }, { val: 0, name: 'Inactive' }] }, { label: "Search By Blog Category", field: 'blogcategory', values: this.value },
      {
        label: 'Search By Blog Featured', field: 'featured', values: [{ val: 1, name: "Yes" }, { val: 0, name: 'No' }]
      },
      {
        label: 'Search By Blog Website', field: 'website', values: [{ val: "Mask Blog 1", name: "Mask Blog 1" }, { val: "Mask Blog 2", name: 'Mask Blog 2' }, { val: "Mask Blog 3", name: "Mask Blog 3" }]
      }
    ],
    search:[{label:"Search By Tags",field:'tags_search',values:this.authval}]


  };
  ip_search_settings:any={
    datesearch:[{startdatelabel:"Start Date",enddatelabel:"End Date",submit:"Search",  field:"date_search"}],
    textsearch: [{ label: "Search By City", field: 'city_search' }, { label: "Search By Region", field: 'region_search' },{ label: "Search By Country", field: 'country_search' },{ label: "Search By Time Zone", field: 'timezone_search' }],
    selectsearch: [{
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
  libdata:any={
    basecondition:{status:1},
    // updateendpoint:'statusupdate1',
    hideeditbutton:true,// all these button options are optional not mandatory
    
    // tableheaders:['author','priority','blogtitle','status','wrongone'], //not required
    custombuttons:[
        {
            label:"Preview Blog 1",
            link:"https://mask-blog1.influxiq.com/blog-details",
            type:'externallink',
            paramtype:'angular',
            param:['blogtitle','_id'],
            cond:'maskblog1',
            condval: 1
        },
        {
          label:"Preview Blog 2",
          link:"https://mask-blog2.influxiq.com/blog-details",
          type:'externallink',
          paramtype:'angular',
          param:['blogtitle','_id'],
          cond:'maskblog2',
          condval: 1
      },
      {
        label:"Preview Blog 3",
        link:"https://mask-blog3.influxiq.com/blog-details",
        type:'externallink',
        paramtype:'angular',
        param:['blogtitle','_id'],
        cond:'maskblog3',
        condval: 1
    }
    ]
}

 public user_cookies:any;
public tag_data:any=[];
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
      this.tag_data = result.adminlist.res;
      for (let i in this.allData) {
        this.value.push(
          { 'name': this.allData[i].blogcategory, val: this.allData[i].blogcategory }
        );

      }
      for (let i in this.tag_data) {
        for (let val in this.tag_data[i].tags) {
          this.authval.push(
            { 'name': this.tag_data[i].tags[val], val: this.tag_data[i].tags[val] }
          );
        }
        

      }
      

    })

    this.getipblogdata();
    this.ippaginationdata();


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
       this.visitor_count.website1=response.visitor_count_website1[0].count;
       this.visitor_count.website2=response.visitor_count_website2[0].count;
       this.visitor_count.website3=response.visitor_count_website3[0].count;
       this.websites.inactiveBlogs=response.total_inactive_blogs;
       this.total_blogs = response.total_blogs;       
     }
   }); 
  }
  getipblogdata(){
    let endpoint : any="getbloglistdatabyip";
    let data:any= {
       limit:10,
       skip:0
     }
   this.httpService.postDatawithoutToken(endpoint,data).subscribe((response:any)=>{
     if(response.status=='success'){
       this.ipwiseblogdata = response.results;
            //  console.log("souresh",this.ipwiseblogdata);
     }
   }); 
  }


  ippaginationdata(){
    let endpoint = 'getblogipdata';
    let endpointc = 'getblogipdata-count';
    let data: any = {
      "condition": {
        "limit": 10,
        "skip": 0
      },
      sort: {
        "type": 'desc',
        "field": 'blogtitle'
      }

    }
    this.httpService.getDataforBlogListApi1(endpointc, data).subscribe((res: any) => {
     
      this.date_search_source_count_ip = res.count;
       console.log('in ngonitttttt',this.date_search_source_count_ip);
      //console.warn('blogData c',res);

    }, error => {
      console.log('Oooops!');
    });

    this.httpService.getDataforBlogListApi1(endpoint, data).subscribe((res: any) => {

      this.ipwiseblogdata = res.results.res;
      console.log('in ngonitttttt',this.ipwiseblogdata);

    }, error => {
      console.log('Oooops!');
    });

  }


}
