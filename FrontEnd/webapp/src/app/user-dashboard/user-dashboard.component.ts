import { Component, OnInit } from '@angular/core';
import { Company } from '../models/company.model';
import { AuthService } from '../services/auth.service';
import { CompanyService } from '../services/company.service';
import { CommaExpr } from '@angular/compiler';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  companies:Company[];
  constructor(private authService:AuthService,private companyService:CompanyService) { }

  ngOnInit() {  }

}
