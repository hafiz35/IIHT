import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { StockPrice } from '../models/stock-price.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StockPriceService {
  baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) { }
  getAllByCompanyStockExchange(stockExchangeId: number, companyId: number, fromDate: Date, toDate: Date): Observable<StockPrice[]> {
    return this.http.get<StockPrice[]>(`${this.baseUrl}/company-service/stock-price/${stockExchangeId}/${companyId}?from=${fromDate}&to=${toDate}`);
  }
  getAllByCompanyStockExchangeListAndDate(req: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/company-service/stock-price`, {
      params: {
        companyList: req.companyList,
        stockExchangeList: req.stockExchangeList,
        from: req.from,
        to: req.to
      }
    });
  }
  getAllBySectorStockExchangeListAndDate(req: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/company-service/stock-price/sector`, {
      params: {
        sectorList: req.sectorList,
        stockExchangeList: req.stockExchangeList,
        from: req.from,
        to: req.to
      }
    });
  }
}
