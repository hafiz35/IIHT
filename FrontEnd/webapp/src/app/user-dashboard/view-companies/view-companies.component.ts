import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { CommaExpr } from '@angular/compiler';
import { Company } from 'src/app/models/company.model';

@Component({
  selector: 'app-view-companies',
  templateUrl: './view-companies.component.html',
  styleUrls: ['./view-companies.component.css']
})
export class ViewCompaniesComponent implements OnInit {
  companyList:Company[];
  constructor(private companyService:CompanyService) { }

  ngOnInit() {
    if (this.companyService.allCompanies) {
      this.companyList = this.companyService.allCompanies;
    } else {
      this.companyService.getActiveCompanies().subscribe(companies => {
        this.companyList = companies;
        this.companyService.allCompanies = companies;
      });
    }
  }
  getStockExchanges(company: Company): string {
    return company.stockCodes.map(stockCode => stockCode.stockExchangeName).join(',');
  }
}
