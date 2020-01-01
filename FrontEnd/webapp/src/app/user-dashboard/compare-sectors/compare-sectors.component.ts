import { Component, OnInit, ComponentFactoryResolver, ViewChild, ViewContainerRef, ComponentRef } from '@angular/core';
import { FormGroup, FormArray, Validators, FormBuilder, FormControl } from '@angular/forms';
import { StockExchange } from 'src/app/models/stock-exchange.model';
import { StockExchangeService } from 'src/app/services/stock-exchange.service';
import { Sector } from 'src/app/models/sector.model';
import { SectorService } from 'src/app/services/sector.service';
import { StockPriceService } from 'src/app/services/stock-price.service';
import { ChartsComponent } from '../charts/charts.component';

@Component({
  selector: 'app-compare-sectors',
  templateUrl: './compare-sectors.component.html',
  styleUrls: ['./compare-sectors.component.css']
})
export class CompareSectorsComponent implements OnInit {
  stockExchanges: StockExchange[];
  sectors: Sector[];
  stockData: any;
  loadingChart = false;
  sectorForm: FormGroup = this.formBuilder.group({
    sectorStockExchange: new FormArray([]),
    fromDate: ['', Validators.required],
    toDate: ['', Validators.required]
  });
  @ViewChild('chartsPlaceHolder', { read: ViewContainerRef, static: false })
  chartsPlaceHolder: ViewContainerRef;
  constructor(
    private formBuilder: FormBuilder,
    private stockExchangeService: StockExchangeService,
    private sectorService: SectorService,
    private stockPriceService: StockPriceService,
    private resolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.stockExchangeService.getListofStockExchange().subscribe(data => this.stockExchanges = data);
    this.sectorService.getAllSectors().subscribe(data => this.sectors = data);
    this.sectorStockExchange.push(new FormGroup({
      stockExchange: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required, Validators.maxLength(10)])
    }));
  }
  get fromDate() {
    return this.sectorForm.get('fromDate');
  }
  get toDate() {
    return this.sectorForm.get('toDate');
  }
  get sectorStockExchange() {
    return this.sectorForm.get('sectorStockExchange') as FormArray;
  }
  addExchange() {
    this.sectorStockExchange.push(new FormGroup({
      stockExchange: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required, Validators.maxLength(10)])
    }));
  }
  removeExchange(index: number) {
    this.sectorStockExchange.removeAt(index);
  }
  onGenerateChartClicked() {
    if (this.sectorForm.valid) {
      const sectorList = [];
      const stockExchangeList = [];
      (this.sectorStockExchange.controls as FormGroup[]).forEach((group, index) => {
        const sector = group.get('name').value;
        const stockExchange = group.get('stockExchange').value;
        sectorList.push(+sector);
        stockExchangeList.push(+stockExchange);
      });
      console.log(sectorList);
      const requestParams = {
        sectorList: sectorList.join(','),
        stockExchangeList: stockExchangeList.join(','),
        from: this.fromDate.value,
        to: this.toDate.value
      };
      this.loadingChart = true;
      this.stockPriceService.getAllBySectorStockExchangeListAndDate(requestParams).subscribe(data => {
        this.stockData = data;
        const factory = this.resolver.resolveComponentFactory(ChartsComponent);
        this.chartsPlaceHolder.clear();
        const componentRef: ComponentRef<ChartsComponent> = this.chartsPlaceHolder.createComponent(factory);
        componentRef.instance.data = this.stockData;
        componentRef.instance.request = requestParams;
        this.loadingChart = false;
      });
    }
  }

}
