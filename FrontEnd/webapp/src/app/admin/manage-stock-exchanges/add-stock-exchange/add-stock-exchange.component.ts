import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StockExchange } from '../../../models/stock-exchange.model';
import { StockExchangeService } from '../../../services/stock-exchange.service';

@Component({
  selector: 'app-add-stock-exchange',
  templateUrl: './add-stock-exchange.component.html',
  styleUrls: ['./add-stock-exchange.component.css']
})
export class AddStockExchangeComponent implements OnInit {
  stockExchangeForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(45), Validators.pattern('[a-zA-Z0-9 ]{2,45}')]],
    brief: ['', [Validators.required, Validators.maxLength(100)]],
    remarks: ['', [Validators.required, Validators.maxLength(50)]],
    contactAddress: ['', [Validators.required, Validators.maxLength(255)]]
  });
  addSuccessful = false;
  added = false;
  constructor(private formBuilder: FormBuilder, private stockExchangeService: StockExchangeService) { }

  ngOnInit() {
  }
  get name() {
    return this.stockExchangeForm.get('name');
  }
  get brief() {
    return this.stockExchangeForm.get('brief');
  }
  get remarks() {
    return this.stockExchangeForm.get('remarks');
  }
  get contactAddress() {
    return this.stockExchangeForm.get('contactAddress');
  }
  addStockExchange() {
    if (this.stockExchangeForm.valid) {
      const newStockExchange: StockExchange = {
        name: this.name.value,
        brief: this.brief.value,
        contactAddress: this.contactAddress.value,
        remarks: this.remarks.value
      };
      this.stockExchangeService.addStockExchange(newStockExchange).subscribe(stockExchange => {
        this.added = true;
        this.addSuccessful = true;
        this.stockExchangeService.stockExchangeList.push(stockExchange);
      }, () => {
        this.added = true;
        this.addSuccessful = false;
      });
    }
  }
}
