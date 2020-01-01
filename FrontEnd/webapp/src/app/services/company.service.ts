import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company } from '../models/company.model';
import { environment } from 'src/environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  baseUrl: string = environment.baseUrl;
  private _allCompanies: BehaviorSubject<Company[]> = new BehaviorSubject<Company[]>(null);
  constructor(private httpClient: HttpClient) { }
  get allCompanies() {
    return this._allCompanies.value;
  }
  set allCompanies(companies: Company[]) {
    this._allCompanies.next(companies);
  }
  getAllCompanies(): Observable<Company[]> {
    return this.httpClient.get<Company[]>(`${this.baseUrl}/company-service/company/all`);
  }
  getActiveCompanies(): Observable<Company[]> {
    return this.httpClient.get<Company[]>(`${this.baseUrl}/company-service/company`);
  }
  getCompanyById(id: number): Observable<Company> {
    return this.httpClient.get<Company>(`${this.baseUrl}/company-service/company/${id}`);
  }
  addCompany(company: Company): Observable<Company> {
    return this.httpClient.post<Company>(`${this.baseUrl}/company-service/company`, company);
  }
  modifyCompany(updatedCompany: Company): Observable<Company> {
    return this.httpClient.put<Company>(`${this.baseUrl}/company-service/company`, updatedCompany);
  }
  toggleActive(id: number): Observable<Company> {
    return this.httpClient.put<Company>(`${this.baseUrl}/company-service/company/${id}/toggle-active`, null);
  }
  deleteCompany(id: number): Observable<Company> {
    return this.httpClient.delete<Company>(`${this.baseUrl}/company-service/company/${id}`);
  }
  companyExists(companyName: string) {
    return this.httpClient.get<Company>(`${this.baseUrl}/company-service/company/verify`, {
      params: {
        name: encodeURIComponent(companyName)
      }
    });
  }
  companyCodeTaken(stockExchangeId: number, code: string) {
    return this.httpClient.get<boolean>(`${this.baseUrl}/company-service/company-stock-exchange/verify/${stockExchangeId}/${code}`);
  }
}
