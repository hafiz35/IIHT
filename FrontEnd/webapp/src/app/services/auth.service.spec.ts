import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { Router } from '@angular/router';

export class RouterStub {
  navigate() {
  }
}
export class MockUserService {
  authenticate(username: string, password: string) {
    return true;
  }
}
describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({

    providers: [AuthService,
      { provide: UserService, useClass: MockUserService },
      { provide: Router, useClass: RouterStub }
    ]
  }));

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });

  it(' getToken', () => {
    const service: AuthService = TestBed.get(AuthService);

    expect(service.getToken()).toBe('');
  });


  it(' setToken', () => {
    const service: AuthService = TestBed.get(AuthService);
    service.setToken("rtrtrt")
    expect(service.getToken()).toBe('rtrtrt');
  });
  it(' login', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service.login("ab", "password")).toBeTruthy();
  });

  it(' logout', () => {
    const service: AuthService = TestBed.get(AuthService);
    service.logout();
    expect(service.getToken()).toEqual(null);
  });

});
