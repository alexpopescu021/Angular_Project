import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ApiService } from 'src/app/services/externalServices/service/api.service';

const themeColors = ['Purple', 'Pink', 'DarkBlue'];

function getThemeColor() {
  return themeColors[Math.floor(Math.random() * themeColors.length)];
}

@Component({
  selector: 'app-market-chart',
  templateUrl: './market-chart.component.html',
  styleUrls: ['./market-chart.component.scss'],
})
export class MarketChartComponent implements OnInit, OnDestroy {
  title = 'ng-chart';
  barChart: any;
  apikey = 'your_api_key_here'; // replace with your actual API key

  constructor(private http: HttpClient, private api: ApiService) {}

  ngOnInit() {
    this.api.getTrendingCurrency('usd').subscribe((data) => {
      this.createBarChart(data);
    });
  }

  createBarChart(data: any) {
    const labels = data.map((coin: any) => coin.id);
    const marketCaps = data.map((coin: any) => coin.market_cap);
    const backgroundColors = labels.map(() => getThemeColor());

    const canvas: any = document.getElementById('barCanvas');
    const ctx = canvas.getContext('2d');

    this.barChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Market Cap',
            data: marketCaps,
            backgroundColor: backgroundColors,
            borderColor: 'white',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            type: 'logarithmic',
            min: 1000000000, // 1 billion
            max: 1000000000000, // 1 trillion
            ticks: {
              color: 'white', // changes the y-axis label color
              callback: function (value, _index) {
                if (
                  value === 1000000000 ||
                  value === 10000000000 ||
                  value === 100000000000 ||
                  value === 1000000000000
                ) {
                  return '$' + value;
                }
                return;
              },
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)', // changes the y-axis grid line color
            },
          },
          x: {
            ticks: {
              color: 'white', // changes the x-axis label color
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)', // changes the x-axis grid line color
            },
          },
        },
        plugins: {
          legend: {
            labels: {
              color: 'white', // changes the legend color
              boxWidth: 5,
              padding: 5,
            },
          },
        },
      },
    });
  }

  ngOnDestroy() {
    if (this.barChart) {
      this.barChart.destroy();
      this.barChart = null;
    }
  }
}
