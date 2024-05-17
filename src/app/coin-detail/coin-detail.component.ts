import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';
import 'chartjs-adapter-luxon';
import {
  CandlestickController,
  CandlestickElement,
} from 'chartjs-chart-financial';
import zoomPlugin from 'chartjs-plugin-zoom';

import { ApiService } from '../services/externalServices/service/api.service';
import { ExtCurrencyService } from '../services/externalServices/service/ext-currency.service';

Chart.register(CandlestickElement, CandlestickController, zoomPlugin);

@Component({
  selector: 'app-coin-detail',
  templateUrl: './coin-detail.component.html',
  styleUrls: ['./coin-detail.component.scss'],
})
export class CoinDetailComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('chart') chartRef!: ElementRef;
  chart!: Chart;
  coinData: any;
  coinId!: string;
  days: number = 30;
  currency: string = 'EUR';

  constructor(
    private api: ApiService,
    private activatedRoute: ActivatedRoute,
    private currencyService: ExtCurrencyService
  ) {}

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((val) => {
      this.coinId = val['id'];
      this.getCoinData();
    });
    this.currencyService.getCurrency().subscribe((val) => {
      this.currency = val;
      this.updateChartData();
    });
  }

  ngAfterViewInit(): void {
    this.initChart();
  }

  initChart(): void {
    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'candlestick',
      data: {
        datasets: [],
      },
      options: {
        plugins: {
          zoom: {
            zoom: {
              wheel: {
                enabled: true,
              },
              mode: 'xy',
            },
          },
        },
        scales: {
          x: {
            type: 'time',
          },
          y: {
            type: 'linear',
          },
        },
      },
    });
    this.updateChartData();
    this.chart.update();
  }

  updateChartData(): void {
    if (this.chart) {
      this.getGraphData(this.days);
    }
  }

  getCoinData() {
    this.api.getCurrencyById(this.coinId).subscribe((res) => {
      this.coinData = res;
    });
  }

  getGraphData(days: number) {
    this.days = days;
    this.api
      .getGrpahicalCurrencyData(this.coinId, this.currency, this.days)
      .subscribe((res) => {
        if (this.chart) {
          const dataset = {
            data: res.map((a: any) => ({
              x: a[0], // time
              o: a[1], // open
              h: a[2], // high
              l: a[3], // low
              c: a[4], // close
            })),
          };
          this.chart.data.datasets = [dataset];
          this.chart.update();
        }
      });
  }
}
