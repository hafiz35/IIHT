import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCompanyComponent } from './add-company.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SectorService } from 'src/app/services/sector.service';
import { CompanyService } from 'src/app/services/company.service';
import { StockExchangeService } from 'src/app/services/stock-exchange.service';
import { from } from 'rxjs';
import { StockExchange } from 'src/app/models/stock-exchange.model';

describe('AddCompanyComponent', () => {
  let component: AddCompanyComponent;
  let fixture: ComponentFixture<AddCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, HttpClientModule],
      declarations: [AddCompanyComponent],
      providers: [SectorService, CompanyService, StockExchangeService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('name validity when empty', () => {
    let name = component.companyForm.controls['name'];
    name.setValue('');
    expect(name.valid).toBeFalsy();
  });
  xit('name validity', () => {
    let name = component.companyForm.controls['name'];
    name.setValue('name');
    expect(name.valid).toBeTruthy();
  });

  it('turnover validity', () => {
    let turnover = component.companyForm.controls['turnover'];
    turnover.setValue('');
    expect(turnover.valid).toBeFalsy();
  });
  it('turnover validity', () => {
    let turnover = component.companyForm.controls['turnover'];
    turnover.setValue('123');
    expect(turnover.valid).toBeTruthy();
  });

  it('ceo validity', () => {
    let ceo = component.companyForm.controls['ceo'];
    ceo.setValue('');
    expect(ceo.valid).toBeFalsy();
  });

  it('ceo validity', () => {
    let ceo = component.companyForm.controls['ceo'];
    ceo.setValue('ceo');
    expect(ceo.valid).toBeTruthy();
  });

  it('boardOfDirectors validity', () => {
    let boardOfDirectors = component.companyForm.controls['boardOfDirectors'];
    boardOfDirectors.setValue('');
    expect(boardOfDirectors.valid).toBeFalsy();
  });

  it('boardOfDirectors validity', () => {
    let boardOfDirectors = component.companyForm.controls['boardOfDirectors'];
    boardOfDirectors.setValue('1');
    expect(boardOfDirectors.valid).toBeTruthy();
  });

  it('brief validity empty', () => {
    let brief = component.companyForm.controls['brief'];
    brief.setValue('');
    expect(brief.valid).toBeFalsy();
  });

  it('brief validity', () => {
    let brief = component.companyForm.controls['brief'];
    brief.setValue('1');
    expect(brief.valid).toBeTruthy();
  });
  it('sector validity', () => {
    let sector = component.companyForm.controls['sector'];
    sector.setValue('');
    expect(sector.valid).toBeFalsy();
  });

  it('sector validity', () => {
    let sector = component.companyForm.controls['sector'];
    sector.setValue('sector');
    expect(sector.valid).toBeTruthy();
  });

  //    ///for get methods

  it('name validity when empty', () => {
    let name = component.companyForm.controls['name'];
    name.setValue('');
    expect(component.name.value).toBe('');
  });
  xit('name validity', () => {
    let name = component.companyForm.controls['name'];
    name.setValue('nam');
    expect(component.name.value).toBe('name');
  });

  it('turnover validity', () => {
    let turnover = component.companyForm.controls['turnover'];
    turnover.setValue('');
    expect(component.turnover.value).toBe('');
  });
  it('turnover validity', () => {
    let turnover = component.companyForm.controls['turnover'];
    turnover.setValue('turnover');
    expect(component.turnover.value).toBe('turnover');
  });

  it('ceo validity', () => {
    let ceo = component.companyForm.controls['ceo'];
    ceo.setValue('');
    expect(component.ceo.value).toBe('');
  });

  it('ceo validity', () => {
    let price = component.companyForm.controls['ceo'];
    price.setValue('ceo');
    expect(component.ceo.value).toBe('ceo');
  });

  it('boardOfDirectors validity', () => {
    let boardOfDirectors = component.companyForm.controls['boardOfDirectors'];
    boardOfDirectors.setValue('');
    expect(component.boardOfDirectors.value).toBe('');
  });

  it('boardOfDirectors validity', () => {
    let boardOfDirectors = component.companyForm.controls['boardOfDirectors'];
    boardOfDirectors.setValue('boardOfDirectors');
    expect(component.boardOfDirectors.value).toBe('boardOfDirectors');
  });

  it('brief validity', () => {
    let brief = component.companyForm.controls['brief'];
    brief.setValue('');
    expect(component.brief.value).toBe('');
  });

  it('brief validity', () => {
    let brief = component.companyForm.controls['brief'];
    brief.setValue('brief');
    expect(component.brief.value).toBe('brief');
  });

  it('sector validity', () => {
    let sector = component.companyForm.controls['sector'];
    sector.setValue('');
    expect(component.sector.value).toBe('');
  });

  it('sector validity', () => {
    let sector = component.companyForm.controls['sector'];
    sector.setValue('sector');
    expect(component.sector.value).toBe('sector');
  });

  it('getAllSectors', () => {
    let service = TestBed.get(SectorService);
    spyOn(service, 'getAllSectors').and.returnValue(from([[
      {
        id: 1,
        name: "string",
        brief: "string",
        companies: []
      }
    ]]))
    fixture.detectChanges();
    component.ngOnInit();
    expect(component.sectors.length).toBe(1);
  });
  it('get stockExchangeList', () => {
    let service = TestBed.get(SectorService);
    spyOn(service, 'getAllSectors').and.returnValue(from([[
      {
        id: 1,
        name: "string",
        brief: "string",
        companies: []
      }
    ]]))
    fixture.detectChanges();
    component.ngOnInit();
    expect(component.sectors.length).toBe(1);
    let stockExchangeService = TestBed.get(StockExchangeService);
    spyOn(stockExchangeService, 'stockExchangeList').and.returnValue(from(
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
    expect(component.stockExchanges.length).toBe(0)



  });
  it('stockExchangeList', () => {
    let service = TestBed.get(SectorService);
    spyOn(service, 'getAllSectors').and.returnValue(from([[
      {
        id: 1,
        name: "string",
        brief: "string",
        companies: []
      }
    ]]))
    fixture.detectChanges();
    component.ngOnInit();
    expect(component.sectors.length).toBe(1);
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

 xit('isCompanyNameTaken', () => {
    let name = component.companyForm.controls['name'];
    name.setValue('nam');
component.isCompanyNameTaken(component.name.value);

   
  });




  
 it('addExchange', () => {
component.addExchange();
expect(component.stockCodes.length).toBe(2)

 
});

it('removeExchange', () => {
  component.addExchange();
  component.removeExchange(0);
  expect(component.stockCodes.length).toBe(1)
  
   
  });


  it('isAlreadySelected', () => {
    let stockExchange: StockExchange={
      id: 1,
      name: "string",
      brief: "string",
      contactAddress: "string",
      remarks: "string",
      companyList: []
    }
   let isAlreadySelected= component.isAlreadySelected(stockExchange);
    expect(isAlreadySelected).toBeFalsy();
    
     
    });

    



});