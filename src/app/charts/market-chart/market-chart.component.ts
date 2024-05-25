import { Component } from '@angular/core';
import { Chart } from 'chart.js';

const colorMap = {
  BTC: 'gold',
  ETH: 'grey',
  ADA: 'RoyalBlue',
  BNB: 'yellow',
  DOGE: 'lightblue',
  LTC: 'silver',
  // Add more as needed
};

@Component({
  selector: 'app-market-chart',
  templateUrl: './market-chart.component.html',
  styleUrls: ['./market-chart.component.scss'],
})
export class MarketChartComponent {
  title = 'ng-chart';
  barChart: any;

  ngOnInit() {
    this.createBarChart();
  }

  createGradient(ctx: any) {
    const gradientFill = ctx.createLinearGradient(0, 350, 0, 50);
    gradientFill.addColorStop(0, 'rgba(228, 76, 196, 0.0)');
    gradientFill.addColorStop(1, 'rgba(228, 76, 196, 0.14)');
    return gradientFill;
  }

  createBarChart() {
    const canvas: any = document.getElementById('barCanvas');
    const ctx = canvas.getContext('2d');

    this.barChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['BTC', 'ETH', 'BNB', 'ADA', 'DOGE', 'LTC'], // Top cryptos
        datasets: [
          {
            label: 'Market Cap',
            data: [1000, 2000, 1500, 3000, 500, 1200], // Market cap data
            backgroundColor: Object.values(colorMap),
            borderColor: 'white',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          x: {
            ticks: {
              color: 'white', // changes the x-axis label color
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)', // changes the x-axis grid line color
            },
          },
          y: {
            ticks: {
              color: 'white', // changes the y-axis label color
              callback: function (value, index, ticks) {
                return '$' + value;
              },
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)', // changes the y-axis grid line color
            },
          },
        },
        plugins: {
          legend: {
            labels: {
              color: 'white', // changes the legend color
            },
          },
        },
      },
    });
  }
}
