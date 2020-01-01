import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStockExchangeComponent } from './add-stock-exchange.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { StockExchangeService } from 'src/app/services/stock-exchange.service';

describe('AddStockExchangeComponent', () => {
  let component: AddStockExchangeComponent;
  let fixture: ComponentFixture<AddStockExchangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[ReactiveFormsModule,HttpClientModule],
      declarations: [ AddStockExchangeComponent ],
      providers:[StockExchangeService,HttpClient]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStockExchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  
  
    it('invalid when form is empty', () => {
      expect(component.stockExchangeForm.valid).toBeFalsy();
    });
  
   xit('name validity', () => {
      let name = component.stockExchangeForm.controls['name'];
      name.setValue('abc');
      expect(name.valid).toBeTruthy();
    });
  
  
    it('name validity when empty', () => {
      let name = component.stockExchangeForm.controls['name'];
      name.setValue('');
      expect(name.valid).toBeFalsy();
    });
  
    it('brief validity', () => {
      let brief  = component.stockExchangeForm.controls['brief'];
      brief.setValue('pwd12345678');
      expect(brief.valid).toBeTruthy();
    });
   
  
    it('remarks validity when empty', () => {
      let remarks = component.stockExchangeForm.controls['remarks'];
      remarks.setValue('');
      expect(remarks.valid).toBeFalsy();
    });
  
    it('remarks password validity when empty', () => {
      let remarks = component.stockExchangeForm.controls['remarks'];
      remarks.setValue('remarks');
      expect(remarks.valid).toBeTruthy();
    });
    it(' contactAddress validity when empty', () => {
      let  contactAddress = component.stockExchangeForm.controls['contactAddress'];
      contactAddress.setValue('');
      expect(contactAddress.valid).toBeFalsy();
    });
  
    it('contactAddress password validity when empty', () => {
      let contactAddress = component.stockExchangeForm.controls['contactAddress'];
      contactAddress.setValue('contactAddress');
      expect(contactAddress.valid).toBeTruthy();
    });
  
  
  
  
    it('get name validity when empty', () => {
      let name = component.stockExchangeForm.controls['name'];
      name.setValue('');
      expect(component.name.value).toBe('');
    });

    it('get name validity when empty', () => {
      let name = component.stockExchangeForm.controls['name'];
      name.setValue('name');
      expect(component.name.value).toBe('name');
    });
  
    it('get brief validity', () => {
      let brief = component.stockExchangeForm.controls['brief'];
      brief.setValue('pwdifj');
      expect(component.brief.value).toBe('pwdifj');
    });
  
  
    it('get brief validity when empty', () => {
      let brief = component.stockExchangeForm.controls['brief'];
      brief.setValue('');
      expect(component.brief.value).toBe('');
    });
  
  
    it('get remarks validity when empty', () => {
      let remarks = component.stockExchangeForm.controls['remarks'];
      remarks.setValue('');
      expect(component.remarks.value).toBe('');
    });
  
    it('get remarks validity', () => {
      let remarks = component.stockExchangeForm.controls['remarks'];
      remarks.setValue('abhvds');
      expect(component.remarks.value).toBe('abhvds');
    });
  
    it('get contactAddress validity when empty', () => {
      let contactAddress = component.stockExchangeForm.controls['contactAddress'];
      contactAddress.setValue('');
      expect(component.contactAddress.value).toBe('');
    });
  
    it('get contactAddress validity', () => {
      let contactAddress = component.stockExchangeForm.controls['contactAddress'];
      contactAddress.setValue('abhvds');
      expect(component.contactAddress.value).toBe('abhvds');
    });
  
  });