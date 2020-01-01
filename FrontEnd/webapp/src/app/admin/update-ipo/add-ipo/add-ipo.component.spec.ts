import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIpoComponent } from './add-ipo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { IpoService } from 'src/app/services/ipo.service';
import { StockExchangeService } from 'src/app/services/stock-exchange.service';
import { from } from 'rxjs';

describe('AddIpoComponent', () => {
  let component: AddIpoComponent;
  let fixture: ComponentFixture<AddIpoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule,HttpClientModule],
      declarations: [AddIpoComponent],
      providers:[IpoService, StockExchangeService]
     
      
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('company validity when empty', () => {
    let company = component.ipoForm.controls['company'];
    company.setValue('');
    expect(company.valid).toBeFalsy();
  });
  it('company validity', () => {
    let company = component.ipoForm.controls['company'];
    company.setValue('company');
    expect(company.valid).toBeTruthy();
  });

  it('stockExchange validity', () => {
    let stockExchange = component.ipoForm.controls['stockExchange'];
    stockExchange.setValue('');
    expect(stockExchange.valid).toBeFalsy();
  });
  it('stockExchange validity', () => {
    let stockExchange = component.ipoForm.controls['stockExchange'];
    stockExchange.setValue('stockExchange');
    expect(stockExchange.valid).toBeTruthy();
  });

  it('price validity when empty', () => {
    let price = component.ipoForm.controls['price'];
    price.setValue('');
    expect(price.valid).toBeFalsy();
  });

  it('price validity', () => {
    let price = component.ipoForm.controls['price'];
    price.setValue('12');
    expect(price.valid).toBeTruthy();
  });
 
  it('totalShares validity', () => {
    let totalShares = component.ipoForm.controls['totalShares'];
    totalShares.setValue('');
    expect(totalShares.valid).toBeFalsy();
  });

  it('totalShares validity', () => {
    let totalShares = component.ipoForm.controls['totalShares'];
    totalShares.setValue('1');
    expect(totalShares.valid).toBeTruthy();
  });

  it('openDate validity', () => {
    let openDate = component.ipoForm.controls['openDate'];
    openDate.setValue('');
    expect(openDate.valid).toBeFalsy();
  });

  it('openDate validity', () => {
    let openDate = component.ipoForm.controls['openDate'];
    openDate.setValue('1');
    expect(openDate.valid).toBeTruthy();
  });
  it('remarks validity', () => {
    let remarks = component.ipoForm.controls['remarks'];
    remarks.setValue('');
    expect(remarks.valid).toBeFalsy();
  });

  it('remarks validity', () => {
    let remarks = component.ipoForm.controls['remarks'];
    remarks.setValue('remarks');
    expect(remarks.valid).toBeTruthy();
  });

  ///for get methods

  it('company validity when empty', () => {
    let company = component.ipoForm.controls['company'];
    company.setValue('');
    expect(component.company.value).toBe('');
  });
  it('company validity', () => {
    let username = component.ipoForm.controls['company'];
    username.setValue('company');
    expect(component.company.value).toBe('company');
  });

  it('stockExchange validity', () => {
    let stockExchange = component.ipoForm.controls['stockExchange'];
    stockExchange.setValue('');
    expect(component.stockExchange.value).toBe('');
  });
  it('stockExchange validity', () => {
    let stockExchange = component.ipoForm.controls['stockExchange'];
    stockExchange.setValue('stockExchange');
    expect(component.stockExchange.value).toBe('stockExchange');
  });

  it('price validity', () => {
    let price = component.ipoForm.controls['price'];
    price.setValue('');
    expect(component.price.value).toBe('');
  });

  it('price validity', () => {
    let price = component.ipoForm.controls['price'];
    price.setValue('12');
    expect(component.price.value).toBe('12');
  });
 
  it('totalShares validity', () => {
    let totalShares = component.ipoForm.controls['totalShares'];
    totalShares.setValue('');
    expect(component.totalShares.value).toBe('');
  });

  it('totalShares validity', () => {
    let totalShares = component.ipoForm.controls['totalShares'];
    totalShares.setValue('1');
    expect(component.totalShares.value).toBe('1');
  });

  it('openDate validity', () => {
    let openDate = component.ipoForm.controls['openDate'];
    openDate.setValue('');
    expect(component.openDate.value).toBe('');
  });

  it('openDate validity', () => {
    let openDate = component.ipoForm.controls['openDate'];
    openDate.setValue('1');
    expect(component.openDate.value).toBe('1');
  });
  it('remarks validity', () => {
    let remarks = component.ipoForm.controls['remarks'];
    remarks.setValue('');
    expect(component.remarks.value).toBe('');
  });

  it('remarks validity', () => {
    let remarks = component.ipoForm.controls['remarks'];
    remarks.setValue('remarks');
    expect(component.remarks.value).toBe('remarks');
  });



  it('getListofStockExchange', () => {
    let service = TestBed.get(StockExchangeService);

    spyOn(service, 'getListofStockExchange').and.returnValue(from(
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


  it('loadCompanies', () => {
    let service = TestBed.get(StockExchangeService);

    spyOn(service, 'getAllCompaniesByStockExchange').and.returnValue(from(
    [[{
      id: 1,
      name: "string",
      turnover: 26,
      ceo: "string",
      boardOfDirectors: "string",
      brief: "string",
      sector: null,
      sectorId: 48,
      active: true,
      stockCodes: []
    }]]
  ))
  let stockExchange = component.ipoForm.controls['stockExchange'];
  stockExchange.setValue('stockExchange');
  fixture.detectChanges();
  component.loadCompanies();
  expect(component.allCompanies.length).toBe(1)
  });


  it('loadCompanies when empty stockExchange', () => {

  fixture.detectChanges();
  component.loadCompanies();
  expect(component.allCompanies.length).toBe(0)
  });

});
