import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sector } from '../models/sector.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SectorService {
  baseUrl:string=environment.baseUrl;
  constructor(private http:HttpClient) { }

  getAllSectors():Observable<Sector[]>{
    return this.http.get<Sector[]>(`${this.baseUrl}/company-service/sector/all`);
  }
}
