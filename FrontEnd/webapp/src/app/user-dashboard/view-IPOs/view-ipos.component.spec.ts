import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewIPOsComponent } from './view-ipos.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { IpoService } from 'src/app/services/ipo.service';
import { from } from 'rxjs';

describe('ViewIPOsComponent', () => {
  let component: ViewIPOsComponent;
  let fixture: ComponentFixture<ViewIPOsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule],
      declarations: [ ViewIPOsComponent ],
      providers:[
        IpoService,HttpClient
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewIPOsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('get all getAllIpos', () => {
    let service = TestBed.get(IpoService);

    spyOn(service, 'getAllIpos').and.returnValue(from(
      [[{
        id: 1,
        company:"string",
        stockExchange:"string",
        price:26,
        totalShares:26,
        openDate:new Date(),
        remarks:"string"
      }]]
    ))
    fixture.detectChanges();
    component.ngOnInit();
    expect(component.ipos.length).toBe(1)
  });
});
