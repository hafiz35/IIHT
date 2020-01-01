import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareCompaniesComponent } from './compare-companies.component';
import { StockExchangeService } from 'src/app/services/stock-exchange.service';
import { StockPriceService } from 'src/app/services/stock-price.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { from } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

describe('CompareCompaniesComponent', () => {
  let component: CompareCompaniesComponent;
  let fixture: ComponentFixture<CompareCompaniesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[ReactiveFormsModule,HttpClientModule],
      declarations: [ CompareCompaniesComponent ],
      providers:[StockExchangeService,StockPriceService,HttpClient]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('get name', () => {
    let name = component.companyForm.controls['name'];
    expect(component.name).toBe(null);
  });

  it('get stockExchange', () => {
    let stockExchange = component.companyForm.controls['stockExchange'];
    expect(component.stockExchange).toBe(null);
  });

  it('getListofStockExchange', () => {
    let stockExchangeService = TestBed.get(StockExchangeService);

    spyOn(stockExchangeService, 'getListofStockExchange').and.returnValue(from(
      [[{
        id: 1,
        name: "string",
        brief: "string",
        contactAddress: "string",
        remarks: "string",
        companyList: []
      }]]
    ))
    fixture.detectChanges();
    component.ngOnInit();
    expect(component.stockExchanges.length).toBe(1)
  });


  
  it('addExchange', () => {
    component.addExchange();
    expect(component.companyStockExchange.length).toBe(2)


  });

  it('removeExchange', () => {
    component.addExchange();
    component.removeExchange(0);
    expect(component.companyStockExchange.length).toBe(1)


  });
});
