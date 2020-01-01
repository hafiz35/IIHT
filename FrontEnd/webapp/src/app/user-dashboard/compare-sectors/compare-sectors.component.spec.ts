import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareSectorsComponent } from './compare-sectors.component';
import { StockExchangeService } from 'src/app/services/stock-exchange.service';
import { from } from 'rxjs';
import { SectorService } from 'src/app/services/sector.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

describe('CompareSectorsComponent', () => {
  let component: CompareSectorsComponent;
  let fixture: ComponentFixture<CompareSectorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[ReactiveFormsModule,HttpClientModule],
      declarations: [ CompareSectorsComponent ],
      providers:[StockExchangeService,SectorService, HttpClient]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareSectorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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


  
  it('getAllSectors', () => {
    let sectorService = TestBed.get(SectorService);

    spyOn(sectorService, 'getAllSectors').and.returnValue(from(
      [[{
        id: 1,
        name:"string",
        brief:"string",
        companies:[]
      }]]
    ))
    fixture.detectChanges();
    component.ngOnInit();
    expect(component.sectors.length).toBe(1)
  });


  it('addExchange', () => {
    component.addExchange();
    expect(component.sectorStockExchange.length).toBe(2)


  });

  it('removeExchange', () => {
    component.addExchange();
    component.removeExchange(0);
    expect(component.sectorStockExchange.length).toBe(1)


  });
});
