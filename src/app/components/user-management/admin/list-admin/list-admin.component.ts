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
  public adminDataList_skip:any;
  public modify_header_array  :any;
  public apiUrl:any=environment['API_URL2'];
  public deleteendpoint:any='';
  public updateendpoint:any='';
  public token:any='';
  public date_search_source:any;
  public date_search_endpoint:any;
  public tablename:any='data_user';
  public statusarray:any;
  public adminDataList_detail_datatype:any;
  public editroute:any='';
  public adminDataList_detail_skip:any='';
  public custom_link:any;
  public search_settings:any;
  public searchendpoint :any;
  public sortdata :any;
  public datacollection :any;
  public date_search_source_count :any;
  public limitcond :any;

  constructor(public activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.data.forEach(res=>{
      console.log(res)
    })


  }

}
