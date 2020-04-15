import { Component, OnInit ,ViewChild,Inject} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MetaService } from '@ngx-meta/core';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {

  public header_text:any="Add Blog Category";

  public configAddEdit: any = {
    action: "add",
    endpoint: "https://hntm6xe6of.execute-api.us-east-1.amazonaws.com/dev/api1/addorupdatedata",
    endpoint2:"https://hntm6xe6of.execute-api.us-east-1.amazonaws.com/dev/api1/",

    source: "blog_category",
    condition: {},
    defaultData: null,
    jwtToken: this.cookieService.get('jwtToken'),
    // jwtToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJleHAiOjE1ODYxNzk3MzcsImlhdCI6MTU4NjA5MzMzN30.62F_1FAIekcBiBYaVnAFvEMeLN1Z5_CP3lJZcgEnfe4",
    callBack: "blog/category/list",
    userData: { id: "18801017007", name: "Admin" },
    defaultDataAlways: null
  }
  
  constructor(public meta: MetaService, public activatedRoute: ActivatedRoute , private cookieService : CookieService) { 
       this.meta.setTitle('Virus Barrier Medical Face Mask Blog backend | Blog Category Add Edit');
    this.meta.setTag('og:description', 'Virus Barrier Medical Face Mask Blog backend to keep medical professionals safe and protected against harmful viruses, bacteria, and other critical circumstances, while also tending to their comfort.');
    this.meta.setTag('twitter:description', 'Virus Barrier Medical Face Mask Blog backend to keep medical professionals safe and protected against harmful viruses, bacteria, and other critical circumstances, while also tending to their comfort.');

    this.meta.setTag('og:keyword', 'Virus Barrier Medical Face Mask Blog backend, Medical Face Mask Blog backend, Medical Face Mask Blog backend for Virus');
    this.meta.setTag('twitter:keyword', 'Virus Barrier Medical Face Mask Blog backend, Medical Face Mask Blog backend, Medical Face Mask Blog backend for Virus');

    this.meta.setTag('og:title', 'Virus Barrier Medical Face Mask Blog backend | Blog Category Add Edit');
    this.meta.setTag('twitter:title', 'Virus Barrier Medical Face Mask Blog backend | Blog Category Add Edit');
    this.meta.setTag('og:type', 'website');
    this.meta.setTag('og:url','https://mask-blog-backend.influxiq.com/');    
    this.meta.setTag('og:image', '../../assets/images/logo-fb.jpg');
    this.meta.setTag('twitter:image', '../../assets/images/logo-twitter.jpg');

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      
      if (params._id) {
        this.activatedRoute.data.subscribe(resolveData => {         
          this.configAddEdit.defaultData = resolveData.blogCatList.res[0];          
          this.configAddEdit.action = "edit";
          this.header_text = "Edit Blog Category";
          this.configAddEdit.condition = { id: params._id };
        });
      }
    });
  }
  inputUntouch(form: any, val: any) {
    form.controls[val].markAsUntouched();
  }

 
  // blogCategoryFormSubmit(){
  //     for (let x in this.blogCategoryForm.controls) {
  //       this.blogCategoryForm.controls[x].markAsTouched();
  //     }
  //     if(this.blogCategoryForm.valid){
  //       let endpoint:any="blog-add";
  //       let data : any={
  //         "source": "blog_category",
  //         "data":this.blogCategoryForm.value,
  //         "sourceobj": ["parent_cat_id"]
  //       }
  //       this.apiService.postDatawithoutToken(endpoint,data).subscribe((response)=>{
  //         console.log(response);
  //       })
        
  //     }
  //   }
    
}
