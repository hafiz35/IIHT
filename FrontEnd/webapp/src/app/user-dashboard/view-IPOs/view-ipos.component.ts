import { Component, OnInit } from '@angular/core';
import { IpoService } from 'src/app/services/ipo.service';
import { IPO } from 'src/app/models/ipo.model';

@Component({
  selector: 'app-view-ipos',
  templateUrl: './view-ipos.component.html',
  styleUrls: ['./view-ipos.component.css']
})
export class ViewIPOsComponent implements OnInit {

  ipos:IPO[];
  constructor(private ipoService:IpoService) { }

  ngOnInit() {
    this.ipoService.getAllIpos().subscribe(data=>this.ipos=data);
  }

}
