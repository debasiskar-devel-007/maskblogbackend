import { Component, OnInit ,ViewChild,Inject} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, AbstractControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { HttpService } from '../../../../services/http.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material";
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-add-edit-blog',
  templateUrl: './add-edit-blog.component.html',
  styleUrls: ['./add-edit-blog.component.css']
})
export class AddEditBlogComponent implements OnInit {
  public blogManagementForm: FormGroup;
  public headerText:any="Add"
  public statuschecked:boolean=true;
  public buttonText:any="Submit" ; 
  public tags_array:any=[];
  filteredOptions: Observable<string[]>;
  myControl = new FormControl();
 
  constructor(public apiService : HttpService,public fb: FormBuilder,public router:Router,public activatedRoute:ActivatedRoute) {

    this.blogManagementForm = this.fb.group({                                                               
      blog_title:['',Validators.required],
      blog_cat:['',Validators.required],
      description: ["", Validators.required],
      priority: ["", Validators.required],
      status  :[""],
      author  :[""],
      tag:[""],
      youtube_url:[""],
      website:[],
      features:[]
    })
   }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }
  inputUntouch(form: any, val: any) {
    form.controls[val].markAsUntouched();
  }
  blogManagementFormSubmit(){
    for (let x in this.blogManagementForm.controls) {
      this.blogManagementForm.controls[x].markAsTouched();
    }
    if(this.blogManagementForm.valid){
      let endpoint:any="blog-add";
      let data : any={
        "source": "blog_management",
        "data":this.blogManagementForm.value,
        "sourceobj": ["blog_cat"]
      }
      this.apiService.postDatawithoutToken(endpoint,data).subscribe((response)=>{
        console.log(response);
      })
      
    }
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return 
  }
  showval(event: any) {
    
    if (event.keyCode == 13 || event.keyCode == 32) {
      this.tags_array.push(event.target.value);
      this.blogManagementForm.controls['tags'].patchValue("");
      return;
    }

  }

}
