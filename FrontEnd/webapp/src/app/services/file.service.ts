import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FileSaverService } from 'ngx-filesaver';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
    providedIn: 'root'
})
export class FileService {
    private baseUrl = environment.baseUrl;
    constructor(private http: HttpClient, private fileSaverService: FileSaverService) { }

    pushFileToStorage(file: File): Observable<any> {
        console.log('push file to storage');
        const body = new FormData();
        body.append('file', file);
        return this.http.post<any>(`${this.baseUrl}/excel-service/excel/upload`, body);
    }
    download(request: any): Observable<HttpResponse<any>> {
        const reqparams = {
            from: request.from,
            to: request.to,
            stockExchangeList: request.stockExchangeList
        };
        if (request.companyList) {
            reqparams['companyList'] = request.companyList;
        }
        if (request.sectorList) {
            reqparams['sectorList'] = request.sectorList;
        }
        return this.http.get(`${this.baseUrl}/excel-service/excel/download`, {
            responseType: 'blob',
            observe: 'response',
            params: reqparams
        });
    }
}
