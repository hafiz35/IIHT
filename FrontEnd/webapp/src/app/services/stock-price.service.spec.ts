
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { StockPriceService } from './stock-price.service';
import { StockPrice } from '../models/stock-price.model';

describe('stock price service', () => {
  let service: StockPriceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StockPriceService]
    });

    service = TestBed.get(StockPriceService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should have a service instance', () => {
    expect(service).toBeDefined();
  });

  // it('getAllByCompanyStockExchange', () => {

  //   const dummyPosts: StockPrice[] = [{
  //     id: 1,
  //     price: 48,
  //     date: new Date(),
  //     companyCode: "string"
  //   }, {
  //     id: 2,
  //     price: 48,
  //     date: new Date(),
  //     companyCode: "string"
  //   }];
  //   service.getAllByCompanyStockExchange(1, 1, new Date(), new Date()).subscribe(data => {
  //     expect(data).toBe(dummyPosts);
  //   });

  //   const req = httpMock.expectOne(`${service.baseUrl}/company-service/stock-price/1/1?from=1&to=1`, 'call to api');
  //   expect(req.request.method).toBe('GET');
  //   req.flush(dummyPosts);
  // });



  // it('getAllByCompanyStockExchangeListAndDate', () => {


  //   service.getAllByCompanyStockExchangeListAndDate(1).subscribe(data => {
  //     expect(data).toBe(null);
  //   });

  //   const req = httpMock.expectOne(`${service.baseUrl}/company-service/stock-price?companyList=all&stockExchangeList=all&from=1&to=1`, 'call to api');
  //   expect(req.request.method).toBe('GET');
  //   req.flush(null);
  // });



});