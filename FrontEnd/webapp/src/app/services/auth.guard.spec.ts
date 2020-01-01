import { TestBed, async, inject } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
export class MockAuthService{
  loggedInUser:BehaviorSubject<User>=new BehaviorSubject<User>({
    username:"string",
    password:"string",
    role:"string",
    email:"string",
    mobileNumber:"string",
    confirmed:true
  });
}
describe('AuthGuard', () => {
  // beforeEach(() => {
  //   TestBed.configureTestingModule({
  //     providers: [AuthGuard]
  //   });
  // let  service = TestBed.get(AuthGuard);
  // });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule],
      providers: [AuthGuard,HttpClient,
        {provide:AuthService, useClass:MockAuthService},
      {provide:Router}
      ]
    });

    const service = TestBed.get(AuthGuard);
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));

  it('checkLogin ...', inject([AuthGuard], (guard: AuthGuard) => {
    
   let ret= guard.checkLogin(null)
   expect(ret).toBeTruthy();
  })); 

});
