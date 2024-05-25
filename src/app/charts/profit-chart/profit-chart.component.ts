import { Component } from '@angular/core';
import { Chart } from 'chart.js';

const colorMap = {
  '1D': 'gold',
  '7D': 'grey',
  '1M': 'RoyalBlue',
  // Add more as needed
};

@Component({
  selector: 'app-profit-chart',
  templateUrl: './profit-chart.component.html',
  styleUrls: ['./profit-chart.component.scss'],
})
export class ProfitChartComponent {
  title = 'ng-chart';
  lineChart: any;
  selectedTimePeriod: '1D' | '7D' | '1M' = '1D';

  ngOnInit() {
    this.createLineChart();
  }

  createLineChart() {
    const canvas: any = document.getElementById('lineCanvas');
    const ctx = canvas.getContext('2d');

    this.lineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['1D', '7D', '1M'], // Time periods
        datasets: [
          {
            label: 'Profit',
            data: {
              '1D': [
                5, 7, 6, 8, 5, 7, 6, 5, 7, 8, 9, 7, 6, 5, 7, 8, 9, 7, 6, 5, 7,
                6, 5, 7,
              ], // Hourly profit for 1 day
              '7D': [5, 7, 6, 8, 9, 7, 6], // Daily profit for 7 days
              '1M': [5, 7, 6, 8], // Weekly profit for 1 month
            }[this.selectedTimePeriod],
            borderColor: colorMap[this.selectedTimePeriod],
            borderWidth: 2,
            // Other options...
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
  changeTimePeriod(period: string) {
    switch (period) {
      case '1D':
        this.lineChart.data.labels = [
          '0H',
          '1H',
          '2H',
          '3H',
          '4H',
          '5H',
          '6H',
          '7H',
          '8H',
          '9H',
          '10H',
          '11H',
          '12H',
          '13H',
          '14H',
          '15H',
          '16H',
          '17H',
          '18H',
          '19H',
          '20H',
          '21H',
          '22H',
          '23H',
        ];
        this.lineChart.data.datasets[0].data = [
          5,
          7,
          6,
          8,
          5,
          7,
          6,
          5,
          7,
          8,
          9,
          7,
          6,
          5,
          7,
          8,
          9,
          7,
          6,
          5,
          7,
          6,
          5,
          7, // Hourly profit for 1 day
        ];
        break;
      case '7D':
        this.lineChart.data.labels = ['1D', '2D', '3D', '4D', '5D', '6D', '7D'];
        this.lineChart.data.datasets[0].data = [
          5,
          7,
          6,
          8,
          9,
          7,
          6, // Daily profit for 7 days
        ];
        break;
      case '1M':
        this.lineChart.data.labels = ['1W', '2W', '3W', '4W'];
        this.lineChart.data.datasets[0].data = [
          5,
          7,
          6,
          8, // Weekly profit for 1 month
        ];
        break;
    }
    this.lineChart.update();
  }
}
