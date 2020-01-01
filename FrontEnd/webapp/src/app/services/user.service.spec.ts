import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { User } from '../models/user.model';
import { of, from } from 'rxjs';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });

    service = TestBed.get(UserService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should have a service instance', () => {
    expect(service).toBeDefined();
  });
  it('addUser', () => {
    service = TestBed.get(UserService);
   httpMock = TestBed.get(HttpTestingController);
   const dummyUser: User={
     username: "string",
     password: "string",
     role: "string",
     email: "string",
     mobileNumber: "string",
     confirmed: true
  
   }
  service.addUser(dummyUser).subscribe(posts => {
     expect(posts).toEqual(dummyUser);
  });
  const request = httpMock.expectOne( `${service.baseUrl}/users`);
  expect(request.request.method).toBe('POST');
  request.flush(dummyUser);
  httpMock.verify();
  });


  it('getUser', () => {
    service = TestBed.get(UserService);
   httpMock = TestBed.get(HttpTestingController);
   const dummyUser: User={
     username: "string",
     password: "string",
     role: "string",
     email: "string",
     mobileNumber: "string",
     confirmed: true
  
   }
  service.getUser("abc").subscribe(posts => {
     expect(posts).toEqual(dummyUser);
  });
  const request = httpMock.expectOne( `${service.baseUrl}/users/abc`);
  expect(request.request.method).toBe('GET');
  request.flush(dummyUser);
  httpMock.verify();
  });
  it('updateUser', () => {
    service = TestBed.get(UserService);
   httpMock = TestBed.get(HttpTestingController);
   const dummyUser: User={
     username: "string",
     password: "string",
     role: "string",
     email: "string",
     mobileNumber: "string",
     confirmed: true
  
   }
  service.updateUser(dummyUser).subscribe(posts => {
     expect(posts).toEqual(dummyUser);
  });
  const request = httpMock.expectOne( `${service.baseUrl}/users`);
  expect(request.request.method).toBe('PUT');
  request.flush(dummyUser);
  httpMock.verify();
  });



  // it('userExists', () => {
  //   service.userExists("ab").subscribe(data => {
  //     expect(data).toBe(of(true));
  //   });

  //       const req = httpMock.expectOne(`${service.baseUrl}/users?username=ab`, 'call to api');
  //   expect(req.request.method).toBe('GET');
  //   req.flush(of(true));
  // });


  it('changePassword', () => {
    service = TestBed.get(UserService);
   httpMock = TestBed.get(HttpTestingController);

  service.changePassword("ab","er","erte").subscribe(posts => {
     expect(posts).toEqual(null);
  });
  const request = httpMock.expectOne( `${service.baseUrl}/users/change/ab`);
  expect(request.request.method).toBe('PUT');
  request.flush(null);
  httpMock.verify();
  });

});