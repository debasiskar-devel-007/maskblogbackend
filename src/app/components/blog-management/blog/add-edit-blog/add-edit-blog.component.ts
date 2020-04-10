import { Component, OnInit ,ViewChild,Inject} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MetaService } from '@ngx-meta/core';

@Component({
  selector: 'app-add-edit-blog',
  templateUrl: './add-edit-blog.component.html',
  styleUrls: ['./add-edit-blog.component.css']
})
export class AddEditBlogComponent implements OnInit {
  server: any ='https://hntm6xe6of.execute-api.us-east-1.amazonaws.com/dev/api1/';

  // server: any =environment.apiBaseUrl;

  addUrl: any = 'addorupdatedata';
  getDataUrl: any= 'datalist';
  public editdata: any = [];
  action:any="add";
  listURL:any="blog-management/list";

public configData: any = {
      baseUrl: "https://fileupload.influxhostserver.com/",
      endpoint: "uploads",
      size: "51200", // kb
      format: ["jpg", "jpeg","png"], // use all small font
      type: "blogs-image",
      path: "blogs",
      prefix: "blogs-image_",
      formSubmit: false,
      conversionNeeded: 0,
      bucketName:"crmfiles.influxhostserver"
    }

// public mask:any=Object.assign(this.configData,{bucketname:"crmfiles.influxhostserver"});
    public configFileData: any = {
      baseUrl: "https://fileupload.influxhostserver.com/",
      endpoint: "uploads",
      size: "51200", // kb
      format: ["pdf", "doc", "docx","docxx"],  // use all small font
      type: "blogs-file",
      path: "blogs",
      prefix: "blogs-file",
      formSubmit: false,
      conversionNeeded: 0,
      bucketName: "crmfiles.influxhostserver"
    }
  constructor(public meta: MetaService, public router:Router,public activatedRoute:ActivatedRoute) {

    this.meta.setTitle('Virus Barrier Medical Face Mask Blog backend | Blog Add Edit');
    this.meta.setTag('og:description', 'Virus Barrier Medical Face Mask Blog backend to keep medical professionals safe and protected against harmful viruses, bacteria, and other critical circumstances, while also tending to their comfort.');
    this.meta.setTag('twitter:description', 'Virus Barrier Medical Face Mask Blog backend to keep medical professionals safe and protected against harmful viruses, bacteria, and other critical circumstances, while also tending to their comfort.');

    this.meta.setTag('og:keyword', 'Virus Barrier Medical Face Mask Blog backend, Medical Face Mask Blog backend, Medical Face Mask Blog backend for Virus');
    this.meta.setTag('twitter:keyword', 'Virus Barrier Medical Face Mask Blog backend, Medical Face Mask Blog backend, Medical Face Mask Blog backend for Virus');

    this.meta.setTag('og:title', 'Virus Barrier Medical Face Mask Blog backend | Blog Add Edit');
    this.meta.setTag('twitter:title', 'Virus Barrier Medical Face Mask Blog backend | Blog Add Edit');
    this.meta.setTag('og:type', 'website');
    this.meta.setTag('og:url','https://mask-blog-backend.influxiq.com/');    
    this.meta.setTag('og:image', '../../assets/images/logo-fb.jpg');
    this.meta.setTag('twitter:image', '../../assets/images/logo-twitter.jpg');

    //  console.log("ggggg",this.configData);
    
   }

  ngOnInit() {
    // console.log("gggggg",this.configData)
    
    this.activatedRoute.params.subscribe(params => {
      if (params._id) {
        this.activatedRoute.data.subscribe(resolveData => {         
          this.editdata= resolveData.blogList.res[0];  
          this.action="edit";    
          
        });
      }
    });
   
  }
  

}
