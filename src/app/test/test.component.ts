import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
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
  constructor() { }

  ngOnInit() {
  }

}
