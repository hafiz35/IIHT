import { Component, OnInit, ComponentFactoryResolver, Injector, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Company } from 'src/app/models/company.model';
import { StockExchange } from 'src/app/models/stock-exchange.model';
import { StockExchangeService } from 'src/app/services/stock-exchange.service';
import { StockPriceService } from '../../services/stock-price.service';
import { ChartsComponent } from '../charts/charts.component';
@Component({
  selector: 'app-compare-companies',
  templateUrl: './compare-companies.component.html',
  styleUrls: ['./compare-companies.component.css']
})
export class CompareCompaniesComponent implements OnInit {
  stockData: any;
  loadingChart = false;
  stockExchanges: StockExchange[] = [];
  autoComplete: boolean[] = [];
  filteredCompanies: Company[][] = [];
  allCompanies: Company[][] = [];
  companyForm: FormGroup = this.formBuilder.group({
    companyStockExchange: new FormArray([]),
    fromDate: ['', Validators.required],
    toDate: ['', Validators.required]
  });
  @ViewChild('chartsPlaceHolder', { read: ViewContainerRef, static: false })
  chartsPlaceHolder: ViewContainerRef;
  constructor(
    private formBuilder: FormBuilder,
    private stockExchangeService: StockExchangeService,
    private stockPriceService: StockPriceService,
    private resolver: ComponentFactoryResolver) { }

  ngOnInit() {
    console.log();
    this.stockExchangeService.getListofStockExchange().subscribe(data => {
      this.stockExchanges = data;
      console.log(this.stockExchanges);
    });
    this.companyStockExchange.push(new FormGroup({
      stockExchange: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required, Validators.maxLength(10)])
    }));
    this.autoComplete.push(false);
    this.allCompanies.push([]);
    this.filteredCompanies.push([]);
  }
  populateAutoComplete(group: FormGroup, index: number) {
    group.get('name').valueChanges.subscribe(value => {
      if (value) {
        this.filteredCompanies[index] = this.allCompanies[index]
          .filter(product => product.name.toLowerCase().includes(value.toLowerCase()));
        this.autoComplete[index] = true;
        if (!this.filteredCompanies[index].length) {
          group.get('name').setErrors({ noCompany: true });
          this.autoComplete[index] = false;
        }
      } else {
        this.filteredCompanies[index] = this.allCompanies[index];
        this.autoComplete[index] = false;

      }
    });
  }
  get name() {
    return this.companyForm.get('name');
  }
  get stockExchange() {
    return this.companyForm.get('stockExchange');
  }
  get fromDate() {
    return this.companyForm.get('fromDate');
  }
  get toDate() {
    return this.companyForm.get('toDate');
  }
  get companyStockExchange() {
    return this.companyForm.get('companyStockExchange') as FormArray;
  }
  addExchange() {
    this.companyStockExchange.push(new FormGroup({
      stockExchange: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required, Validators.maxLength(10)])
    }));
    this.autoComplete.push(false);
  }
  removeExchange(index: number) {
    this.companyStockExchange.removeAt(index);
    this.autoComplete = this.autoComplete.filter((o, i) => i !== index);
    this.allCompanies = this.allCompanies.filter((o, i) => i !== index);
  }
  onGenerateChartClicked() {
    if (this.companyForm.valid) {
      const companyList = [];
      const stockExchangeList = [];
      (this.companyStockExchange.controls as FormGroup[]).forEach((group, index) => {
        const company = this.allCompanies[index].find(companyObj => companyObj.name === group.get('name').value);
        const stockExchange = group.get('stockExchange').value;
        companyList.push(company.id);
        stockExchangeList.push(+stockExchange);
      });

      const requestParams = {
        companyList: companyList.join(','),
        stockExchangeList: stockExchangeList.join(','),
        from: this.fromDate.value,
        to: this.toDate.value
      };
      this.loadingChart = true;
      this.stockPriceService.getAllByCompanyStockExchangeListAndDate(requestParams).subscribe(data => {
        this.stockData = data;
        const factory = this.resolver.resolveComponentFactory(ChartsComponent);
        this.chartsPlaceHolder.clear();
        const componentRef: ComponentRef<ChartsComponent> = this.chartsPlaceHolder.createComponent(factory);
        componentRef.instance.data = this.stockData;
        componentRef.instance.request = requestParams;
        this.loadingChart = false;
      });
    }
  }
  loadCompanies(group: FormGroup, index: number) {
    if (group.get('stockExchange').value) {
      this.stockExchangeService.getAllCompaniesByStockExchange(+group.get('stockExchange').value).subscribe(companies => {
        this.allCompanies[index] = companies;
      });
    } else {
      this.allCompanies[index] = [];
    }
  }
  loadVal(group: FormGroup, value: string, index: number) {
    group.get('name').patchValue(value);
    setTimeout(() => this.autoComplete[index] = false, 200);
  }
}
