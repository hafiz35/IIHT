import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDashboardComponent } from './user-dashboard.component';
import { AuthService } from '../services/auth.service';
import { CompanyService } from '../services/company.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

describe('UserDashboardComponent', () => {
  let component: UserDashboardComponent;
  let fixture: ComponentFixture<UserDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule],
      declarations: [ UserDashboardComponent ],
      providers:[AuthService,CompanyService,HttpClient,
      {provide:Router}
    ],
      schemas:[NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('load', () => {

    
    expect(true).toBeTruthy();
  });
});
