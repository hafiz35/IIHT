import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCompaniesComponent } from './manage-companies.component';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';
import { BehaviorSubject, from } from 'rxjs';
import { Company } from 'src/app/models/company.model';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
//export class MockCompanyService{
  // allCompanies:BehaviorSubject<Company[]>=new BehaviorSubject<Company[]>(
  //   [{
  //     id: 1,
  //     name: "string",
  //     turnover: 26,
  //     ceo: "string",
  //     boardOfDirectors: "string",
  //     brief: "string",
  //     sector: null,
  //     sectorId: 1,
  //     active: true,
  //     stockCodes:[]
  //   }]
  // );
//}
describe('ManageCompaniesComponent', () => {
  let component: ManageCompaniesComponent;
  let fixture: ComponentFixture<ManageCompaniesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule,HttpClientModule],
      declarations: [ManageCompaniesComponent],
      providers: [HttpClient,CompanyService
       // { provide: Router },
        //{provide:CompanyService}//, useClass:MockCompanyService}

      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('getting all companies', () => {
    let service = TestBed.get(CompanyService);

    spyOn(service, 'getAllCompanies').and.returnValue(from(
      [[{
      id: 1,
      name: "string",
      turnover: 26,
      ceo: "string",
      boardOfDirectors: "string",
      brief: "string",
      sector: null,
      sectorId: 1,
      active: true,
      stockCodes:[]
      }]]
    ))
    fixture.detectChanges();
    component.ngOnInit();
    expect(component.companyList.length).toBe(1)
  });



  it('getting all companies behaviour subject', () => {
    let service = TestBed.get(CompanyService);
    spyOn(service, 'allCompanies').and.returnValue(from(
      [[{
      id: 1,
      name: "string",
      turnover: 26,
      ceo: "string",
      boardOfDirectors: "string",
      brief: "string",
      sector: null,
      sectorId: 1,
      active: true,
      stockCodes:[]
      }]]
    ))

    fixture.detectChanges();
    component.ngOnInit();
    expect(component.companyList.length).toBe(0)
  });

  it('toggleActive', () => {
let company:Company={
  id: 1,
  name: "string",
  turnover: 26,
  ceo: "string",
  boardOfDirectors: "string",
  brief: "string",
  sector: null,
  sectorId: 1,
  active: true,
  stockCodes:[]
}
component.toggleActive(company);

    expect(company.active).toBe(company.active)
  });


  it('getStockExchanges', () => {
    let company:Company={
      id: 1,
      name: "string",
      turnover: 26,
      ceo: "string",
      boardOfDirectors: "string",
      brief: "string",
      sector: null,
      sectorId: 1,
      active: true,
      stockCodes:[{
        code: 'STR',
        stockExchange: 1,
        company:1,
        stockExchangeName: 'NSE'
      },
      {
        code: 'STR2',
        stockExchange: 2,
        company:1,
        stockExchangeName: 'BSE'
      }]
    }
   let st= component.getStockExchanges(company);    
       expect(st).toBe('NSE,BSE')
      });
});
