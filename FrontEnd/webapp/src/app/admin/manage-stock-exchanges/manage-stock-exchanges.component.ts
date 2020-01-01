import { Component, OnInit } from '@angular/core';
import { StockExchangeService } from 'src/app/services/stock-exchange.service';
import { StockExchange } from 'src/app/models/stock-exchange.model';

@Component({
  selector: 'app-manage-stock-exchanges',
  templateUrl: './manage-stock-exchanges.component.html',
  styleUrls: ['./manage-stock-exchanges.component.css']
})
export class ManageStockExchangesComponent implements OnInit {
  stockExchangeList: StockExchange[];
  constructor(private stockExchangeService: StockExchangeService) { }

  ngOnInit() {
    this.getAllStockExchange();
  }
  getAllStockExchange() {
    this.stockExchangeService.getListofStockExchange().subscribe(stockExchangeList => {
      this.stockExchangeService.stockExchangeList = stockExchangeList;
      this.stockExchangeList = this.stockExchangeService.stockExchangeList;
    });
  }
}
