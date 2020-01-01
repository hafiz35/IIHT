import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { StockExchange } from '../models/stock-exchange.model';
import { environment } from 'src/environments/environment';
import { Company } from '../models/company.model';
@Injectable({
  providedIn: 'root'
})
export class StockExchangeService {
  baseUrl: string = environment.baseUrl;
  private _stockExchangeList: BehaviorSubject<StockExchange[]> = new BehaviorSubject<StockExchange[]>(null);
  constructor(private https: HttpClient) { }
  get stockExchangeList() {
    return this._stockExchangeList.value;
  }
  set stockExchangeList(stockExchangeList: StockExchange[]) {
    this._stockExchangeList.next(stockExchangeList);
  }
  getListofStockExchange(): Observable<StockExchange[]> {
    return this.https.get<StockExchange[]>(`${this.baseUrl}/company-service/stock-exchange/all`);
  }
  addStockExchange(stockexchange: StockExchange): Observable<StockExchange> {
    return this.https.post<StockExchange>(`${this.baseUrl}/company-service/stock-exchange`, stockexchange);
  }
  findById(id: number): Observable<StockExchange> {
    return this.https.get<StockExchange>(`${this.baseUrl}/company-service/stock-exchange/${id}`);
  }
  getAllCompaniesByStockExchange(id: number): Observable<Company[]> {
    return this.https.get<Company[]>(`${this.baseUrl}/company-service/stock-exchange/${id}/companies`);
  }
}
