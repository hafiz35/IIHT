import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IPO } from 'src/app/models/ipo.model';
import { IpoService } from 'src/app/services/ipo.service';
import { StockExchange } from 'src/app/models/stock-exchange.model';
import { StockExchangeService } from 'src/app/services/stock-exchange.service';
import { Company } from 'src/app/models/company.model';

@Component({
  selector: 'app-add-ipo',
  templateUrl: './add-ipo.component.html',
  styleUrls: ['./add-ipo.component.css']
})
export class AddIpoComponent implements OnInit {
  check: Boolean = false;
  stockExchanges: StockExchange[];
  allCompanies: Company[];
  ipoForm: FormGroup = this.formBuilder.group({
    company: ['', [Validators.required]],
    stockExchange: ['', [Validators.required]],
    price: ['', [Validators.required, Validators.min(1), Validators.pattern('^[0-9]+([.][0-9]+)?$')]],
    totalShares: ['', [Validators.required, Validators.min(1), Validators.pattern('^[0-9]+$')]],
    openDate: ['', [Validators.required]],
    remarks: ['', [Validators.required]]
  });
  constructor(private formBuilder: FormBuilder, private ipoService: IpoService, private stockExchangeService: StockExchangeService) { }

  ngOnInit() {
    this.stockExchangeService.getListofStockExchange().subscribe(data => this.stockExchanges = data);
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
    console.log(this.stockExchange.value);
    
    if (this.stockExchange.value) {
      this.stockExchangeService.getAllCompaniesByStockExchange(this.stockExchange.value).subscribe(companies => {
        this.allCompanies = companies;
        console.log(this.allCompanies);
        
      });
    } else {
      this.allCompanies = [];
    }
  }

  addIpo(){
    const namecompany:Company= this.allCompanies.find((data)=>data.id==this.company.value)
    const nameStockExchange=this.stockExchanges.find((data)=>data.id==this.stockExchange.value)
   const newIpo:IPO={
     company:namecompany.name,
     stockExchange:nameStockExchange.name,
     openDate:this.openDate.value,
     totalShares:this.totalShares.value,
     remarks:this.remarks.value,
     price:this.price.value,
   }
   this.ipoService.addIpo(newIpo).subscribe((data)=>{
      this.ipoService.ipoList.push(data)
      this.ipoForm.reset();
    });
    this.check=true
    setTimeout(() => {
      this.check=false
    }, 3000);
   

  }
}
