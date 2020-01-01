
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { SectorService } from './sector.service';
import { Sector } from '../models/sector.model';

describe('sector service', () => {
  let service: SectorService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SectorService]
    });

    service = TestBed.get(SectorService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should have a service instance', () => {
    expect(service).toBeDefined();
  });

  it('getAllSectors', () => {

    const dummyPosts: Sector[] = [{
      id: 1,
      name:"string",
      brief:"string",
      companies:[]
    }, {
      id: 2,
      name:"string",
      brief:"string",
      companies:[]
    }];
    service.getAllSectors().subscribe(data => {
      expect(data).toBe(dummyPosts);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/company-service/sector/all`, 'call to api');
    expect(req.request.method).toBe('GET');
    req.flush(dummyPosts);
  });


});