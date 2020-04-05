import { Component, OnInit ,ViewChild,Inject} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, AbstractControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { HttpService } from '../../../../services/http.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material";
@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {
  editorconfig:any={};
  public blogCategoryForm: FormGroup;
  public headerText:any="Add"
  public statuschecked:boolean=true;
  public buttonText:any="Submit";
  
  constructor(public apiService : HttpService,public fb: FormBuilder,public router:Router,public activatedRoute:ActivatedRoute) { 
    this.editorconfig.extraAllowedContent = '*[class](*),span;ul;li;table;td;style;*[id];*(*);*{*}';
    this.blogCategoryForm = this.fb.group({                                                                
      blog_cat_name:['',Validators.required],
      priority: ["", Validators.required],
      description: ["", Validators.required],
      status  :[""],
      parent_cat_id:[""]
    })

  }

  ngOnInit() {
  }
  inputUntouch(form: any, val: any) {
    form.controls[val].markAsUntouched();
  }

 
  blogCategoryFormSubmit(){
      for (let x in this.blogCategoryForm.controls) {
        this.blogCategoryForm.controls[x].markAsTouched();
      }
      if(this.blogCategoryForm.valid){
        let endpoint:any="blog-add";
        let data : any={
          "source": "blog_category",
          "data":this.blogCategoryForm.value,
          "sourceobj": ["parent_cat_id"]
        }
        this.apiService.postDatawithoutToken(endpoint,data).subscribe((response)=>{
          console.log(response);
        })
        
      }
    }
    
}
