import { TestBed } from '@angular/core/testing';

import { HttpInterceptorService } from './http-interceptor.service';

describe('HttpInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  xit('should be created', () => {
    const service: HttpInterceptorService = TestBed.get(HttpInterceptorService);
    expect(service).toBeTruthy();
  });
});
