import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart, ChartDataset } from 'chart.js';
import 'chartjs-adapter-luxon';
import {
  CandlestickController,
  CandlestickElement,
} from 'chartjs-chart-financial';
import zoomPlugin from 'chartjs-plugin-zoom';

import { Subscription } from 'rxjs';
import { ApiService } from '../services/externalServices/service/api.service';
import { ExtCurrencyService } from '../services/externalServices/service/ext-currency.service';
import { LoginService } from '../services/login.service';

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
  coinSymbol!: string | null;
  days: number = 30;
  currency: string = 'EUR';
  bids: any[] = [];
  asks: any[] = [];
  private userSub: Subscription = new Subscription();
  isAuthenticated = false;
  depthData: ChartDataset[] = [];
  chartOptions: any = {
    scales: {},
    plugins: {
      legend: {
        display: false,
      },
    },
    events: [],
  };
  constructor(
    private api: ApiService,
    private activatedRoute: ActivatedRoute,
    private currencyService: ExtCurrencyService,
    private router: Router,
    private authService: LoginService
  ) {}

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  ngOnInit(): void {
    this.generateRandomOrders();
    this.activatedRoute.params.subscribe((val) => {
      this.coinId = val['id'];
      this.getCoinData();
    });

    this.activatedRoute.queryParams.subscribe((params) => {
      this.coinSymbol = params['symbol'];
    });

    this.currencyService.getCurrency().subscribe((val) => {
      this.currency = val;
      this.updateChartData();
    });

    this.userSub = this.authService.userSub.subscribe((user) => {
      this.isAuthenticated = !!user;
    });
  }

  buyCurrency() {
    this.router.navigate(['/conversion'], {
      queryParams: { toCurrency: this.coinSymbol },
    });
  }

  generateRandomOrders(): void {
    for (let i = 0; i < 10; i++) {
      let bidPrice = Number((Math.random() * 5000 + 5000).toFixed(2));
      let askPrice = Number((Math.random() * 5000 + 10000).toFixed(2));
      let amount = Number((Math.random() * 5).toFixed(2));
      this.bids.push({ price: bidPrice, amount });
      this.asks.push({ price: askPrice, amount });
    }
    // Sort bids in descending order and asks in ascending order
    this.bids.sort((a, b) => b.price - a.price);
    this.asks.sort((a, b) => a.price - b.price);
    // Add to depthData
    this.bids.forEach((bid, i) => {
      this.depthData.push({
        data: [{ x: bid.price, y: bid.amount }],
        backgroundColor: 'rgba(0, 255, 0, 0.1)', // green with 10% opacity for bids
        borderColor: 'rgb(0, 255, 0)', // solid green for bids
        borderWidth: 1,
      });
    });
    this.asks.forEach((ask, i) => {
      this.depthData.push({
        data: [{ x: ask.price, y: ask.amount }],
        backgroundColor: 'rgba(255, 0, 0, 0.1)', // red with 10% opacity for asks
        borderColor: 'rgb(255, 0, 0)', // solid red for asks
        borderWidth: 1,
      });
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
          legend: {
            display: false,
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
