import { Component, OnInit, Input } from '@angular/core';
import * as FusionCharts from 'fusioncharts';
import { FileService } from 'src/app/services/file.service';
import { map } from 'rxjs/operators';
import { FileSaverService } from 'ngx-filesaver';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  dataSource: any;
  type: string;
  width: string;
  height: string;
  chart: any;
  currentRange: {
    startDate: Date,
    endDate: Date
  };
  @Input()
  request: any;
  @Input()
  data: any;
  constructor(private fileService: FileService, private fileSaverService: FileSaverService) {
    this.type = 'timeseries';
    this.width = '100%';
    this.height = '500';

    // This is the dataSource of the chart
    this.dataSource = {
      caption: {
        text: 'Stock Price Analysis'
      },
      subcaption: {
        text: 'Stock Prices for Company'
      },
      series: 'Type',
      yaxis: [
        {
          plot: 'Sales Value',
          title: 'Sale Value',
          format: {
            prefix: '$'
          }
        }
      ]
    };
  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    const schema = [{
      name: 'Type',
      type: 'string'
    },
    {
      name: 'Time',
      type: 'date',
      format: '%d-%b-%y'
    }, {
      name: 'Stock Price',
      type: 'number'
    }];
    const fusionTable = new FusionCharts.DataStore().createDataTable(
      this.data,
      schema
    );
    this.dataSource.data = fusionTable;
  }
  display($event) {

    console.log($event);

  }
  init($event) {
    this.chart = $event.chart;
    this.chart.addEventListener('ready', () => console.log('Ready'));
    this.chart.addEventListener('initialized', this.getSelectedTime.bind(this));
    this.chart.addEventListener('canvasWheel', this.getScrollTime.bind(this));
    this.chart.addEventListener('timeNavBrushEnd', this.getSelectedTime.bind(this));
    this.chart.addEventListener('customRangeSelect', this.getSelectedTime.bind(this));
    this.chart.addEventListener('standardRangeSelect', this.getSelectedTime.bind(this));
  }
  onExportClick() {
    this.fileService.download(this.request).subscribe(res => {
      const header = res.headers.get('Content-Disposition');
      console.log(header);
      const startIndex = header.indexOf('filename=') + 9;
      const endIndex = header.length;
      const filename = header.slice(startIndex, endIndex);
      this.fileSaverService.save((res.body as Blob), filename);
    });
  }
  getSelectedTime($event) {
    console.log($event);

    this.currentRange = {
      startDate: new Date(this.chart.getTimeSelection().start),
      endDate: new Date(this.chart.getTimeSelection().end)
    };
  }
  getScrollTime($event) {
    this.currentRange = {
      startDate: new Date($event.data.start),
      endDate: new Date($event.data.end)
    };
  }
  onready() {
    console.log('Ready');

  }

}
