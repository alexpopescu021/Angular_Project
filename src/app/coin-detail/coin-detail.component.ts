import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart, LinearScale, TimeScale } from 'chart.js';
import {
  CandlestickController,
  CandlestickElement,
} from 'chartjs-chart-financial';

import { ApiService } from '../services/externalServices/service/api.service';
import { ExtCurrencyService } from '../services/externalServices/service/ext-currency.service';

Chart.register(
  CandlestickElement,
  CandlestickController,
  TimeScale,
  LinearScale
);

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
    });
    this.getCoinData();
    this.currencyService.getCurrency().subscribe((val) => {
      this.currency = val;
      this.updateChartData();
      this.getCoinData();
    });
  }

  ngAfterViewInit(): void {
    this.initChart();
    this.updateChartData();
  }

  initChart(): void {
    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'candlestick',
      data: {
        datasets: [],
      },
      options: {
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
  }

  updateChartData(): void {
    if (this.chart) {
      this.getGraphData(this.days);
    }
  }

  getCoinData() {
    this.api.getCurrencyById(this.coinId).subscribe((res) => {
      console.log(this.coinData);
      if (this.currency === 'USD') {
        res.market_data.current_price.eur = res.market_data.current_price.usd;
        res.market_data.market_cap.eur = res.market_data.market_cap.usd;
      }
      res.market_data.current_price.eur = res.market_data.current_price.eur;
      res.market_data.market_cap.eur = res.market_data.market_cap.eur;
      this.coinData = res;
    });
  }

  getGraphData(days: number) {
    this.days = days;
    this.api
      .getGrpahicalCurrencyData(this.coinId, this.currency, this.days)
      .subscribe((res) => {
        if (this.chart && this.chart.data) {
          this.chart.data.datasets = [
            {
              data: res.map((a: any) => ({
                t: a[0], // time
                o: a[1], // open
                h: a[2], // high
                l: a[3], // low
                c: a[4], // close
              })),
            },
          ];
        }
      });
  }
}
