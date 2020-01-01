import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';
import { map } from 'rxjs/operators';
import { Company } from 'src/app/models/company.model';

@Component({
  selector: 'app-view-company-details',
  templateUrl: './view-company-details.component.html',
  styleUrls: ['./view-company-details.component.css']
})
export class ViewCompanyDetailsComponent implements OnInit {
  currentCompany:Company;
  constructor(private activatedRoute:ActivatedRoute,private companyService:CompanyService) { }

  ngOnInit() {
    this.activatedRoute.params.pipe(
      map(param => +param.id)
    ).subscribe(id => {
      this.currentCompany = this.companyService.allCompanies.find(company => company.id === id);
    });
  }
}
