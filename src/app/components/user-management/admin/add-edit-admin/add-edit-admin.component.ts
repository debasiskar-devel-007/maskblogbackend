import { Component, OnInit, ViewChildren, ViewChild,Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { HttpService } from '../../../../services/http.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-add-edit-admin',
  templateUrl: './add-edit-admin.component.html',
  styleUrls: ['./add-edit-admin.component.css']
})
export class AddEditAdminComponent implements OnInit {

  public addAdminForm: FormGroup;
  public stateList: any;
  public cityList: any; 
  public header_text:any="Add Admin";
  public btn_text:any="Submit";
  public allCities:any;
  public message:any='Admin Added Successfully';
  public condition:any;
  public action:any='add';
  public adminData:any;

  @ViewChild(FormGroupDirective, {static: false}) formDirective: FormGroupDirective;

  constructor(public activatedRoute:ActivatedRoute, public httpService: HttpService, public fb: FormBuilder,public dialog: MatDialog,public router:Router,public cookieService:CookieService,public snackBar:MatSnackBar) { 


    this.activatedRoute.params.subscribe(params => {
      if (params['_id'] != null) {
        this.action = "edit";
        this.condition = { id: params._id };
        this.activatedRoute.data.subscribe(resolveData => {
          this.adminData = resolveData.admin_data.res[0];
          console.log('++++++++++++++++',this.adminData);
        });
      }
      else
        this.action = "add";
    })


    if(router.url != '/admin/add')
    {

      this.addAdminForm = this.fb.group({
        id:null,
        firstname: [null, Validators.required],
        lastname: [null, Validators.required],
        email: [null, Validators.compose([Validators.required, Validators.pattern(/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/)])],
        phone: [null, Validators.required],
        zip: [null, Validators.required],
        city: [null, Validators.required],
        state: [null, Validators.required],
        type: ["admin"],
        status:1
      })

    } else {


      this.addAdminForm = this.fb.group({
        id:null,
        firstname: [null, Validators.required],
        lastname: [null, Validators.required],
        email: [null, Validators.compose([Validators.required, Validators.pattern(/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/)])],
        phone: [null, Validators.required],
        zip: [null, Validators.required],
        city: [null, Validators.required],
        state: [null, Validators.required],
        password: [null, Validators.required],
        conpass: [null, Validators.required],
        type: ["admin"],
        status:1
      },
      {
        validator: this.machpassword('password', 'conpass')
      });

    }


  }

  ngOnInit() {

    switch(this.action) {
      case 'add':
        /* Button text */

      this.message='Admin Added Successfully';
        this.header_text = "Add Admin";
        this.btn_text = "Submit";
  
        break;
      case 'edit':
        /* Button text */
        this.btn_text = "Update ";
        this.message ='Admin Updated Successfully';
        this.setDefaultValue(this.adminData);
        this.header_text = "Edit Admin";
        break;
    }


    this.getStateList();
    this.getCityList();

  }

    /**Miss Match password check function */
    machpassword(passwordkye: string, confirmpasswordkye: string) {
      return (group: FormGroup) => {
        let passwordInput = group.controls[passwordkye],
          confirmpasswordInput = group.controls[confirmpasswordkye];
        if (passwordInput.value !== confirmpasswordInput.value) {
          return confirmpasswordInput.setErrors({ notEquivalent: true });
        }
        else {
          return confirmpasswordInput.setErrors(null);
        }
      };
    }
    getStateList() {
      this.httpService.getJsonObject('assets/data/states.json').subscribe(response => {
        let result: any = {};
        result = response;
        this.stateList = result;
      })
    }
    getCityList() {
      this.httpService.getJsonObject('assets/data/city.json').subscribe((res) => {
        let result: any = {};
        result = res;
        this.cityList = result;
      })
    }
  
  
  
    getCity(event:any) {
      var val = event;
      this.allCities = this.cityList[val];
    }


      /**Submit function */
  addAdminFormSubmit() {
    for (let x in this.addAdminForm.controls) {
      this.addAdminForm.controls[x].markAsTouched();
    }
    if (this.addAdminForm.valid) {
      console.log('hit1')
      /**check id null or not null */
      if(this.addAdminForm.value.id==null){
        delete this.addAdminForm.value.id;
      }
          if (this.addAdminForm.value.conpass != null) {
          delete this.addAdminForm.value.conpass;

        }

        /**Api service for insert form */

        var data = { source: "data_user", 
                    data: this.addAdminForm.value }
        this.httpService.CustomRequest(data, 'addorupdatedata').subscribe((data: any) => {
          // console.log(data);
          if (data.status == 'success') {
          
            this.snackBar.open(this.message,'OK', {
              duration: 3000,
            });

          this.router.navigateByUrl('/admin/list');
          }else{
            // console.log("Add customer Successfully");
            this.formDirective.resetForm();
            this.router.navigateByUrl('/admin/add');
          }
          
        })
    }
  }


  setDefaultValue(defaultValue:any){
    this.addAdminForm.patchValue({
      firstname:defaultValue.firstname,
      lastname:defaultValue.lastname,
      email:defaultValue.email,
      phone:defaultValue.phone,
      city:defaultValue.city,
      state:defaultValue.state,
      zip:defaultValue.zip,
      status:defaultValue.status,
      type:defaultValue.type
    })
  }


  inputUntouched(val: any) {
    this.addAdminForm.controls[val].markAsUntouched();
  }

  

}