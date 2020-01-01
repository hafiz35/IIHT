import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateIpoComponent } from './update-ipo.component';
import { IpoService } from 'src/app/services/ipo.service';
import { from } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';

describe('UpdateIpoComponent', () => {
  let component: UpdateIpoComponent;
  let fixture: ComponentFixture<UpdateIpoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule,HttpClientModule],
      declarations: [ UpdateIpoComponent ],
      providers:[HttpClient]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateIpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('getAllIpos', () => {
    let service = TestBed.get(IpoService);

    spyOn(service, 'getAllIpos').and.returnValue(from(
      [[{
        id: 1,
        company:"string",
        stockExchange:"string",
        price:26,
        totalShares:48,
        openDate:new Date(),
        remarks:"string"
      }]]
    ))
    fixture.detectChanges();
    component.ngOnInit();
    expect(component.ipoList.length).toBe(1)
  });
});
