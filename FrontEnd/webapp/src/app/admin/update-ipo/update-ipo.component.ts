import { Component, OnInit } from '@angular/core';
import { IPO } from 'src/app/models/ipo.model';
import { IpoService } from 'src/app/services/ipo.service';

@Component({
  selector: 'app-update-ipo',
  templateUrl: './update-ipo.component.html',
  styleUrls: ['./update-ipo.component.css']
})
export class UpdateIpoComponent implements OnInit {
  ipoList:IPO[];
  constructor(private ipoService:IpoService) { }

  ngOnInit() {
    this.ipoService.getAllIpos().subscribe(data=>{
      this.ipoService.ipoList=data;
      this.ipoList=this.ipoService.ipoList;
    })
  }
}
