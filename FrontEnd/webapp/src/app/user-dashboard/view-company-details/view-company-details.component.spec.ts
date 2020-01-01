import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCompanyDetailsComponent } from './view-company-details.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';

describe('ViewCompanyDetailsComponent', () => {
  let component: ViewCompanyDetailsComponent;
  let fixture: ComponentFixture<ViewCompanyDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule],
      declarations: [ ViewCompanyDetailsComponent ],
      providers:[HttpClient,
        {provide:ActivatedRoute}
      ]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCompanyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
