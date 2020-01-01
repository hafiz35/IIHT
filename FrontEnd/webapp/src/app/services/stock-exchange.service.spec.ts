
import {
    HttpClientTestingModule,
    HttpTestingController
  } from '@angular/common/http/testing';
  import { TestBed } from '@angular/core/testing';
  import { of } from 'rxjs';
  import { StockExchangeService } from './stock-exchange.service';
  import { StockExchange } from '../models/stock-exchange.model';
  import { Company } from '../models/company.model';
  
  describe('stock exchange service', () => {
    let service: StockExchangeService;
    let httpMock: HttpTestingController;
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [StockExchangeService]
      });
  
      service = TestBed.get(StockExchangeService);
      httpMock = TestBed.get(HttpTestingController);
    });
  
    it('should have a service instance', () => {
      expect(service).toBeDefined();
    });
  
    it('getListofStockExchange', () => {
  
      const dummyPosts: StockExchange[] = [{
        id: 1,
        name: "string",
        brief: "string",
        contactAddress: "string",
        remarks: "string",
        companyList: []
      }, {
        id: 2,
        name: "string",
        brief: "string",
        contactAddress: "string",
        remarks: "string",
        companyList: []
      }];
      service.getListofStockExchange().subscribe(data => {
        expect(data).toBe(dummyPosts);
      });
  
      const req = httpMock.expectOne(`${service.baseUrl}/company-service/stock-exchange/all`, 'call to api');
      expect(req.request.method).toBe('GET');
      req.flush(dummyPosts);
    });
  
  
  
    it('findById', () => {
  
      const dummy: StockExchange = {
        id: 1,
        name: "string",
        brief: "string",
        contactAddress: "string",
        remarks: "string",
        companyList: []
      }
      service.findById(1).subscribe(data => {
        expect(data).toBe(dummy);
      });
  
      const req = httpMock.expectOne(`${service.baseUrl}/company-service/stock-exchange/1`, 'call to api');
      expect(req.request.method).toBe('GET');
      req.flush(dummy);
    });
  
    it('addStockExchange', () => {
  
      const dummy: StockExchange = {
        id: 1,
        name: "string",
        brief: "string",
        contactAddress: "string",
        remarks: "string",
        companyList: []
      }
      service.addStockExchange(dummy).subscribe(data => {
        expect(data).toBe(dummy);
      });
  
      const req = httpMock.expectOne(`${service.baseUrl}/company-service/stock-exchange`, 'call to api');
      expect(req.request.method).toBe('POST');
      req.flush(dummy);
    });
  
  
  
    it('getAllCompaniesByStockExchange', () => {
  
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
      service.getAllCompaniesByStockExchange(1).subscribe(data => {
        expect(data).toBe(dummyPosts);
      });
  
      const req = httpMock.expectOne(`${service.baseUrl}/company-service/stock-exchange/1/companies`, 'call to api');
      expect(req.request.method).toBe('GET');
      req.flush(dummyPosts);
    });
  
  
  
  
    it('get and set stockExchangeList', () => {
      const dummyPosts: StockExchange[] = [{
        id: 1,
        name: "string",
        brief: "string",
        contactAddress: "string",
        remarks: "string",
        companyList: []
      }, {
        id: 2,
        name: "string",
        brief: "string",
        contactAddress: "string",
        remarks: "string",
        companyList: []
      }];
      service.stockExchangeList = dummyPosts;
      expect(service.stockExchangeList).toBe(dummyPosts);
    });
  });