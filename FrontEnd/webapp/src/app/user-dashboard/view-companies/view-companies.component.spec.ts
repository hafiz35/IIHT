import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCompaniesComponent } from './view-companies.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ViewCompaniesComponent', () => {
  let component: ViewCompaniesComponent;
  let fixture: ComponentFixture<ViewCompaniesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule],
      declarations: [ ViewCompaniesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
