import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { HttpService } from '../../../../services/http.service';
import {environment} from '../../../../../environments/environment';


@Component({
  selector: 'app-list-admin',
  templateUrl: './list-admin.component.html',
  styleUrls: ['./list-admin.component.css']
})
export class ListAdminComponent implements OnInit {

  public adminDataList:any;
  public adminDataList_skip:any=["_id","password"];
  public modify_header_array  :any=[''];
  public apiUrl:any=environment['API_URL2'];
  public deleteendpoint:any='';
  // public token:any='';
  public date_search_source:any='data_user';
  public date_search_endpoint:any='datalist';
  public tablename:any='data_user';
  public adminDataList_detail_datatype:any;
  public editroute:any='admin/edit';
  public adminDataList_detail_skip:any='';
 
  public searchendpoint :any='datalist';
  public datacollection :any="getadminlistdata";
  date_search_source_count: any=0;
  datasource: any; 

  limitcond:any={
      "limit":10,
      "skip":0,
      "pagecount":1
  };
// send basic sort data
  sortdata:any={
      "type":'desc',
      "field":'firstname',
      "options":['firstname','email']
  };
  public status: any = [{ val: 1, 'name': 'Active' }, { val: 0, 'name': 'Inactive' }];


  search_settings:any={

    datesearch:[{startdatelabel:"Start Date",enddatelabel:"End Date",submit:"Search",  field:"created_at"}],   // this is use for  date search

    selectsearch:[{ label: 'Search By Status', field: 'status', values: this.status }], 
    // this is use for  select search

     textsearch:[{label:"Search email",field:'email'}],  // this is use for  text search

};

  constructor(public activatedRoute:ActivatedRoute,public httpService:HttpService) { 

     // console.log('custom_link');
        // console.log(this.custom_link);
        let endpointforlist='getadminlistdata';
        let endpointforcount='getadminlistdata-count';
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
        this.httpService.getDataWithoutToken(data,endpointforcount).subscribe((res:any) => {
          // console.log(res)
           
            this.date_search_source_count =res.count;

        }, error => {
            console.log('Oooops!');
        });

        this.httpService.getDataWithoutToken(data,endpointforlist).subscribe((res:any) => {

            this.adminDataList =res.results.admin_list;

        }, error => {
            console.log('Oooops!');
        });
  }

  ngOnInit() {
    this.activatedRoute.data.forEach(res=>{
      let result:any=res;
      this.adminDataList=result.adminlist.res
      console.log(this.adminDataList)


    })


  }

}
