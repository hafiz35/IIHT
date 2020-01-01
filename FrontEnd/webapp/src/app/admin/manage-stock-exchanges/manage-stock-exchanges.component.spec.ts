import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageStockExchangesComponent } from './manage-stock-exchanges.component';
import { Router } from '@angular/router';
import { StockExchangeService } from 'src/app/services/stock-exchange.service';
import { from } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';

describe('ManageStockExchangesComponent', () => {
  let component: ManageStockExchangesComponent;
  let fixture: ComponentFixture<ManageStockExchangesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule,HttpClientModule],
      declarations: [ ManageStockExchangesComponent ],
      providers:[HttpClient
        //{provide:Router}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageStockExchangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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
       companyList:[]
     }]]
   ))
   fixture.detectChanges();
   component.ngOnInit();
   expect(component.stockExchangeList.length).toBe(1)
 });
});
