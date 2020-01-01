
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CompanyService } from './company.service';
import { Company } from '../models/company.model';
import { of } from 'rxjs';

describe('CompanyService', () => {
  let service: CompanyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CompanyService]
    });

    service = TestBed.get(CompanyService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should have a service instance', () => {
    expect(service).toBeDefined();
  });

  it('get all companies', () => {

    const dummyPosts: Company[] = [{
      id: 1,
      name: "string",
      turnover: 26,
      ceo: "string",
      boardOfDirectors: "string",
      brief: "string",
      sector: null,
      active: true,
      stockCodes: []
    }, {
      id: 2,
      name: "string",
      turnover: 26,
      ceo: "string",
      boardOfDirectors: "string",
      brief: "string",
      sector: null,
      active: true,
      stockCodes: []
    }];
    service.getAllCompanies().subscribe(data => {
      expect(data).toBe(dummyPosts);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/company-service/company/all`, 'call to api');
    expect(req.request.method).toBe('GET');
    req.flush(dummyPosts);
  });


  it('get getActiveCompanies', () => {

    const dummyPosts: Company[] = [{
      id: 1,
      name: "string",
      turnover: 26,
      ceo: "string",
      boardOfDirectors: "string",
      brief: "string",
      sector: null,
      active: true,
      stockCodes: []
    }, {
      id: 2,
      name: "string",
      turnover: 26,
      ceo: "string",
      boardOfDirectors: "string",
      brief: "string",
      sector: null,
      active: true,
      stockCodes: []
    }];
    service.getActiveCompanies().subscribe(data => {
      expect(data).toBe(dummyPosts);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/company-service/company`, 'call to api');
    expect(req.request.method).toBe('GET');
    req.flush(dummyPosts);
  });

  it('get getCompanyById', () => {

    const dummyCompany: Company = {
      id: 1,
      name: "string",
      turnover: 26,
      ceo: "string",
      boardOfDirectors: "string",
      brief: "string",
      sector: null,
      active: true,
      stockCodes: []
    }
    service.getCompanyById(1).subscribe(data => {
      expect(data).toBe(dummyCompany);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/company-service/company/1`, 'call to api');
    expect(req.request.method).toBe('GET');
    req.flush(dummyCompany);
  });

  it('addCompany', () => {

    const dummyCompany: Company = {
      id: 1,
      name: "string",
      turnover: 26,
      ceo: "string",
      boardOfDirectors: "string",
      brief: "string",
      sector: null,
      active: true,
      stockCodes: []
    }
    service.addCompany(dummyCompany).subscribe(data => {
      expect(data).toBe(dummyCompany);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/company-service/company`, 'call to api');
    expect(req.request.method).toBe('POST');
    req.flush(dummyCompany);
  });


  
  it('modifyCompany', () => {

    const dummyCompany: Company = {
      id: 1,
      name: "string",
      turnover: 26,
      ceo: "string",
      boardOfDirectors: "string",
      brief: "string",
      sector: null,
      active: true,
      stockCodes: []
    }
    service.modifyCompany(dummyCompany).subscribe(data => {
      expect(data).toBe(dummyCompany);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/company-service/company`, 'call to api');
    expect(req.request.method).toBe('PUT');
    req.flush(dummyCompany);
  });

  it('toggleActive', () => {

    const dummyCompany: Company = {
      id: 1,
      name: "string",
      turnover: 26,
      ceo: "string",
      boardOfDirectors: "string",
      brief: "string",
      sector: null,
      active: true,
      stockCodes: []
    }
    service.toggleActive(1).subscribe(data => {
      expect(data).toBe(dummyCompany);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/company-service/company/1/toggle-active`, 'call to api');
    expect(req.request.method).toBe('PUT');
    req.flush(dummyCompany);
  });

  it('deleteCompany', () => {

    const dummyCompany: Company = {
      id: 1,
      name: "string",
      turnover: 26,
      ceo: "string",
      boardOfDirectors: "string",
      brief: "string",
      sector: null,
      active: true,
      stockCodes: []
    }
    service.deleteCompany(1).subscribe(data => {
      expect(data).toBe(dummyCompany);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/company-service/company/1`, 'call to api');
    expect(req.request.method).toBe('DELETE');
    req.flush(dummyCompany);
  });


  it('companyExists', () => {

    const dummyCompany: Company = {
      id: 1,
      name: "string",
      turnover: 26,
      ceo: "string",
      boardOfDirectors: "string",
      brief: "string",
      sector: null,
      active: true,
      stockCodes: []
    }
    service.companyExists(encodeURIComponent("string")).subscribe(data => {
      expect(data).toBe(dummyCompany);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/company-service/company/verify?name=string`, 'call to api');
    expect(req.request.method).toBe('GET');
    req.flush(dummyCompany);
  });

  
  // it('companyCodeTaken', () => {

  //   service.companyCodeTaken(1,"a").subscribe(data => {
  //     expect(data).toBe(true);
  //   });

  //   const req = httpMock.expectOne(`${service.baseUrl}/company-service/company-stock-exchange/verify/1/a`, 'call to api');
  //   expect(req.request.method).toBe('GET');
  //   req.flush(of(true));
  // });
});