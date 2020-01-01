
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { IpoService } from './ipo.service';
import { IPO } from '../models/ipo.model';

describe('CompanyService', () => {
  let service: IpoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [IpoService]
    });

    service = TestBed.get(IpoService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should have a service instance', () => {
    expect(service).toBeDefined();
  });

  it('getAllIpos', () => {

    const dummyPosts: IPO[] = [{
      id: 1,
      company: "string",
      stockExchange: "string",
      price: 26,
      totalShares: 48,
      openDate: new Date(),
      remarks: "string"
    }, {
      id: 2,
      company: "string",
      stockExchange: "string",
      price: 26,
      totalShares: 48,
      openDate: new Date(),
      remarks: "string"
    }];
    service.getAllIpos().subscribe(data => {
      expect(data).toBe(dummyPosts);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/company-service/ipo/all`, 'call to api');
    expect(req.request.method).toBe('GET');
    req.flush(dummyPosts);
  });



  it('getIpoById', () => {

    const dummyIpo: IPO = {
      id: 1,
      company: "string",
      stockExchange: "string",
      price: 26,
      totalShares: 48,
      openDate: new Date(),
      remarks: "string"
    }
    service.getIpoById(1).subscribe(data => {
      expect(data).toBe(dummyIpo);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/company-service/ipo/1`, 'call to api');
    expect(req.request.method).toBe('GET');
    req.flush(dummyIpo);
  });

  it('addIpo', () => {

    const dummyIpo: IPO = {
      id: 1,
      company: "string",
      stockExchange: "string",
      price: 26,
      totalShares: 48,
      openDate: new Date(),
      remarks: "string"
    }
    service.addIpo(dummyIpo).subscribe(data => {
      expect(data).toBe(dummyIpo);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/company-service/ipo`, 'call to api');
    expect(req.request.method).toBe('POST');
    req.flush(dummyIpo);
  });



  it('modifyIpo', () => {

    const dummyIpo: IPO = {
      id: 1,
      company: "string",
      stockExchange: "string",
      price: 26,
      totalShares: 48,
      openDate: new Date(),
      remarks: "string"
    }
    service.modifyIpo(dummyIpo).subscribe(data => {
      expect(data).toBe(dummyIpo);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/company-service/ipo`, 'call to api');
    expect(req.request.method).toBe('PUT');
    req.flush(dummyIpo);
  });



  it('deleteIpo', () => {

    const dummyIpo: IPO = {
      id: 1,
      company: "string",
      stockExchange: "string",
      price: 26,
      totalShares: 48,
      openDate: new Date(),
      remarks: "string"
    }
    service.deleteIpo(1).subscribe(data => {
      expect(data).toBe(dummyIpo);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/company-service/ipo/1`, 'call to api');
    expect(req.request.method).toBe('DELETE');
    req.flush(dummyIpo);
  });


  it('get and set ipo', () => {
    const dummyPosts: IPO[] = [{
      id: 1,
      company: "string",
      stockExchange: "string",
      price: 26,
      totalShares: 48,
      openDate: new Date(),
      remarks: "string"
    }, {
      id: 2,
      company: "string",
      stockExchange: "string",
      price: 26,
      totalShares: 48,
      openDate: new Date(),
      remarks: "string"
    }];
    service.ipoList = dummyPosts;
    expect(service.ipoList).toBe(dummyPosts);
  });
});