import { Component, OnInit ,ViewChild,Inject} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {
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
  
  constructor(public activatedRoute: ActivatedRoute , private cookieService : CookieService) { 
   

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (params._id) {
        this.activatedRoute.data.subscribe(resolveData => {         
          this.configAddEdit.defaultData = resolveData.blogCatList.res[0];          
          this.configAddEdit.action = "edit";
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
