import { Component, OnInit } from '@angular/core';
import { Company } from '../../models/company.model';
import { StockExchangeService } from '../../services/stock-exchange.service';
import { CompanyService } from '../../services/company.service';
import { StockExchange } from '../../models/stock-exchange.model';

@Component({
  selector: 'app-manage-companies',
  templateUrl: './manage-companies.component.html',
  styleUrls: ['./manage-companies.component.css']
})
export class ManageCompaniesComponent implements OnInit {
  isActive = false;
  companyList: Company[];
  stockExchangeList: StockExchange[];
  constructor(private companyService: CompanyService, private stockExchangeService: StockExchangeService) { }

  ngOnInit() {
    if (this.companyService.allCompanies) {
      this.companyList = this.companyService.allCompanies;
    } else {
      this.companyService.getAllCompanies().subscribe(companies => {
        this.companyList = companies;
        this.companyService.allCompanies = companies;
      });
    }
  }
  toggleActive(company: Company) {
    this.companyService.toggleActive(company.id).subscribe(data => company.active = data.active);
  }
  getStockExchanges(company: Company): string {
    return company.stockCodes.map(stockCode => stockCode.stockExchangeName).join(',');
  }
}
