import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIpoComponent } from './edit-ipo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Subject, BehaviorSubject, from, empty } from 'rxjs';
import { IpoService } from 'src/app/services/ipo.service';
import { IPO } from 'src/app/models/ipo.model';
import { CompanyService } from 'src/app/services/company.service';
import { StockExchangeService } from 'src/app/services/stock-exchange.service';
export class ActivatedRouteStub{
  private subject=new Subject();
  push(value){
     this.subject.next(value);
  }

  get params(){
return this.subject.asObservable();
  }
}
export class MockIpoService{
  loggedInUser:BehaviorSubject<IPO[]>=new BehaviorSubject<IPO[]>(
    [{
      id: 1,
      company:"string",
      stockExchange:"string",
      price:26,
      totalShares:48,
      openDate:new Date(),
      remarks:"string"
    }]
  );
}
describe('EditIpoComponent', () => {
  let component: EditIpoComponent;
  let fixture: ComponentFixture<EditIpoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule,HttpClientModule],
      declarations: [EditIpoComponent],
      providers:[
        {provide:ActivatedRoute, useClass:ActivatedRouteStub},
        {provide:Router},
        {provide:IpoService, useClass:MockIpoService},
        DatePipe,StockExchangeService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditIpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('test for route params', () => {

  //   let route:ActivatedRouteStub=TestBed.get(ActivatedRoute)
  //   route.push({id:1})
  //   component.ngOnInit();

  //   let service = TestBed.get(CompanyService);

  //   spyOn(service, 'getListofStockExchange').arguments(1).and.returnValue(from(
  //     [[{
  //       id: 1,
  //       companyName: "string",
  //       turnOver: 122,
  //       ceo: "string",
  //       board_of_directors: "string",
  //       sector: "string",
  //       writeUp: "string",
  //       stockPrice: 123,
  //       code:"string"
  //     }]]
  //   ))




  //   let servicen = TestBed.get(StockExchangeService);

  //   spyOn(servicen, 'getListofStockExchange').and.returnValue(from(
  //     [[{
  //       id: 1,
  //       name: "string",
  //       brief: "string",
  //       contactAddress: "string",
  //       remarks: "string",
  //       companyList: []
  //     }]]
  //   ))


  //   fixture.detectChanges();
  //   component.ngOnInit();
  //   expect(component.stockExchanges.length).toBe(1)

  // });


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

  it('price validity', () => {
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

  

  // it(' edit ipo', () => {
  //   let service=TestBed.get(IpoService)
  //   let spy=spyOn(service,'modifyIpo').and.callFake(t=>{
  //     return from([[
  //       {
  //         id: 1,
  //         company:"string",
  //         stockExchange:"string",
  //         price:26,
  //         totalShares:48,
  //         openDate:new Date(),
  //         remarks:"string"
  //       }
  //     ]])
  //   });
  //   component.editIpo();
  //   expect(spy).toHaveBeenCalled();
  // });
});
