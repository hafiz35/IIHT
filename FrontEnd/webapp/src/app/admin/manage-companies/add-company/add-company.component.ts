import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { CompanyService } from '../../../services/company.service';
import { map } from 'rxjs/operators';
import { Sector } from '../../../models/sector.model';
import { SectorService } from '../../../services/sector.service';
import { StockExchangeService } from '../../../services/stock-exchange.service';
import { StockExchange } from '../../../models/stock-exchange.model';
import { Company } from '../../../models/company.model';
import { CompanyStockExchange } from '../../../models/company-stock-exchange.model';
import { of } from 'rxjs';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {
  companyForm: FormGroup = this.formBuilder.group({
    name: ['', {
      validators: [Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20),
      Validators.pattern('[a-zA-Z ]*')],
      asyncValidators: [this.isCompanyNameTaken.bind(this)]
    }],
    turnover: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    ceo: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
    boardOfDirectors: ['', [Validators.required]],
    brief: ['', [Validators.required, Validators.maxLength(100)]],
    sector: ['', [Validators.required]],
    stockCodes: new FormArray([])
  });
  sectors: Sector[];
  stockExchanges: StockExchange[];
  companyAdded:boolean;
  selectedStockExchange: StockExchange[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private companyService: CompanyService,
    private sectorService: SectorService,
    private stockExchangeService: StockExchangeService) { }

  ngOnInit() {
    this.companyAdded=false;
    this.stockCodes.push(new FormGroup({
      exchange: new FormControl('', [Validators.required]),
      stockCode: new FormControl('', [Validators.required, Validators.maxLength(10)], [this.stockCodeTaken.bind(this)])
    }));
    this.sectorService.getAllSectors().subscribe(sectors => this.sectors = sectors);
    if (this.stockExchangeService.stockExchangeList) {
      this.stockExchanges = this.stockExchangeService.stockExchangeList;
    } else {
      this.stockExchangeService.getListofStockExchange().subscribe(stockExchanges => {
        this.stockExchanges = stockExchanges;
        this.stockExchangeService.stockExchangeList = stockExchanges;
      });
    }
  }
  get name() {
    return this.companyForm.get('name');
  }
  get turnover() {
    return this.companyForm.get('turnover');
  }
  get ceo() {
    return this.companyForm.get('ceo');
  }
  get boardOfDirectors() {
    return this.companyForm.get('boardOfDirectors');
  }
  get brief() {
    return this.companyForm.get('brief');
  }
  get sector() {
    return this.companyForm.get('sector');
  }
  get stockCodes() {
    return this.companyForm.get('stockCodes') as FormArray;
  }
  isCompanyNameTaken(formControl: AbstractControl) {
    if (formControl.value.length > 2) {
      console.log(formControl.value);
      return this.companyService.companyExists(formControl.value).pipe(map(value => value ? new Object({
        companyExists: true
      }) : null));
    } else {
      return of();
    }
  }
  stockCodeTaken(formControl: AbstractControl) {
    if (formControl.value.length > 2) {
      return this.companyService.companyCodeTaken(formControl.parent.get('exchange').value, formControl.value)
        .pipe(
          map(taken => taken ? new Object({
            codeTaken: true
          }) : null)
        );
    } else {
      return of();
    }
  }
  addExchange() {
    this.stockCodes.push(new FormGroup({
      exchange: new FormControl('', [Validators.required]),
      stockCode: new FormControl('', [Validators.required, Validators.maxLength(10)], [this.stockCodeTaken.bind(this)])
    }));
  }
  removeExchange(index: number) {
    this.stockCodes.removeAt(index);
  }
  selectStockExchange($event) {
    const stockExchangeId = +$event.target.value;
    const isPresent = this.selectedStockExchange.find(stockExchange => stockExchange.id === stockExchangeId);
    if (!isPresent) {
      const exchange = this.stockExchanges.find(stockExchange => stockExchange.id === stockExchangeId);
      this.selectedStockExchange.push(exchange);
      const group = this.stockCodes.controls as FormGroup[];
      const selectedExchangeIds = [];
      group.forEach(formGroup => selectedExchangeIds.push(+formGroup.get('exchange').value));
      this.selectedStockExchange = this.selectedStockExchange
        .filter(selExchange =>
          selectedExchangeIds.find(selectedExchangeId => selectedExchangeId === selExchange.id) !== undefined);
      console.log(this.selectedStockExchange);
    }
  }
  isAlreadySelected(stockExchange: StockExchange): boolean {
    const isPresent = this.selectedStockExchange.find(selectedstockExchange => selectedstockExchange.id === stockExchange.id);
    return isPresent ? true : false;
  }
  addCompany() {
    if (this.companyForm.valid) {
      // const selectedSector = this.sectors.find(sector => +this.sector.value === sector.id);
      const codes: CompanyStockExchange[] = [];
      this.stockCodes.controls.forEach((stockCode: FormGroup) => {
        const companyStockExchange: CompanyStockExchange = {
          code: stockCode.get('stockCode').value,
          stockExchange: stockCode.get('exchange').value
        };
        codes.push(companyStockExchange);
      });
      const newCompany: Company = {
        name: this.name.value,
        active: false,
        boardOfDirectors: this.boardOfDirectors.value,
        brief: this.brief.value,
        ceo: this.ceo.value,
        turnover: +this.turnover.value,
        sectorId: +this.sector.value,
        stockCodes: codes
      };
      this.companyService.addCompany(newCompany).subscribe((company: Company) => {
        this.companyService.allCompanies.push(company);
        this.companyAdded=true;
        setTimeout(() => {
          this.companyAdded=false;
          this.companyForm.reset();
        }, 3000);
      });
    }
  }
}
