import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IPO } from '../models/ipo.model';

@Injectable({
  providedIn: 'root'
})
export class IpoService {
  baseUrl: string = environment.baseUrl;
  private _ipoList: BehaviorSubject<IPO[]> = new BehaviorSubject<IPO[]>(null);
  constructor(private httpClient: HttpClient) { }
  get ipoList() {
    return this._ipoList.value;
  }
  set ipoList(ipoList: IPO[]) {
    this._ipoList.next(ipoList);
  }
  getAllIpos(): Observable<IPO[]> {
    return this.httpClient.get<IPO[]>(`${this.baseUrl}/company-service/ipo/all`);
  }
  getIpoById(id: number): Observable<IPO> {
    return this.httpClient.get<IPO>(`${this.baseUrl}/company-service/ipo/${id}`);
  }
  addIpo(ipo: IPO): Observable<IPO> {
    return this.httpClient.post<IPO>(`${this.baseUrl}/company-service/ipo`, ipo);
  }
  deleteIpo(id: number): Observable<IPO> {
    return this.httpClient.delete<IPO>(`${this.baseUrl}/company-service/ipo/${id}`);
  }
  modifyIpo(ipo: IPO): Observable<IPO> {
    return this.httpClient.put<IPO>(`${this.baseUrl}/company-service/ipo`, ipo)
  }
}
