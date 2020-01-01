import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { IPO } from 'src/app/models/ipo.model';
import { IpoService } from 'src/app/services/ipo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StockExchange } from 'src/app/models/stock-exchange.model';
import { Company } from 'src/app/models/company.model';
import { StockExchangeService } from 'src/app/services/stock-exchange.service';
import { CompanyService } from 'src/app/services/company.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-ipo',
  templateUrl: './edit-ipo.component.html',
  styleUrls: ['./edit-ipo.component.css']
})
export class EditIpoComponent implements OnInit {
  check: Boolean = false;
  stockExchanges: StockExchange[];
  allCompanies: Company[];
  todayDate:string
  id:number;
  ipoForm: FormGroup = this.formBuilder.group({
    company: ['', [Validators.required]],
    stockExchange: ['', [Validators.required]],
    price: ['', [Validators.required, Validators.min(1), Validators.pattern('^[0-9]+([.][0-9]+)?$')]],
    totalShares: ['', [Validators.required, Validators.min(1), Validators.pattern('^[0-9]+$')]],
    openDate: ['', [Validators.required]],
    remarks: ['', [Validators.required]]
  });
  constructor(private formBuilder: FormBuilder, private ipoService: IpoService,private router:Router,private route: ActivatedRoute, private stockExchangeService: StockExchangeService, private companyService: CompanyService,private datepipe:DatePipe) { }


  ngOnInit() { 

    this.stockExchangeService.getListofStockExchange().subscribe(data => {
      this.stockExchanges = data
      this.route.params.subscribe(params => {
        this.id = +params['id'];
        
        const ipo: IPO = this.ipoService.ipoList.find((ipolist) => ipolist.id == this.id);
        this.todayDate=this.datepipe.transform(new Date(), 'yyyy-MM-dd');
        const nameStockExchange = this.stockExchanges.find((data) => data.name == ipo.stockExchange);
        this.companyService.getAllCompanies().subscribe((data) => {
          this.allCompanies = [...data]
          const namecompany: Company = this.allCompanies.find((data) => data.name == ipo.company)
          if (ipo) {
            this.ipoForm.patchValue({
              company: namecompany.id,
              stockExchange: nameStockExchange.id,
              price: ipo.price,
              totalShares: ipo.totalShares,
              openDate: this.todayDate,
              remarks: ipo.remarks
            })
          }
        });
      })
    });
  }
  get company() {
    return this.ipoForm.get('company');
  }
  get stockExchange() {
    return this.ipoForm.get('stockExchange');
  }
  get price() {
    return this.ipoForm.get('price');
  }
  get totalShares() {
    return this.ipoForm.get('totalShares');
  }
  get openDate() {
    return this.ipoForm.get('openDate');
  }
  get remarks() {
    return this.ipoForm.get('remarks');
  }
  loadCompanies() {
    if (this.stockExchange.value) {
      this.stockExchangeService.getAllCompaniesByStockExchange(this.stockExchange.value).subscribe(companies => {
        this.allCompanies = companies;
      });
    } else {
      this.allCompanies = [];
    }
  }
  editIpo() {
    const namecompany:Company= this.allCompanies.find((data)=>data.id==this.company.value)
    const nameStockExchange=this.stockExchanges.find((data)=>data.id==this.stockExchange.value)
    const newIpo: IPO = {
      id:this.id,
      company:namecompany.name,
      stockExchange: nameStockExchange.name,
      openDate: this.openDate.value,
      totalShares: this.totalShares.value,
      remarks: this.remarks.value,
      price: this.price.value,
    }
    this.ipoService.modifyIpo(newIpo).subscribe(data => {
      this.ipoService.ipoList.push(data);

      this.router.navigate(['/admin-dashboard','update-ipo'])
    });

  }
}
