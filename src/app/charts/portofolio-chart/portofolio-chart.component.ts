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
  selector: 'app-portofolio-chart',
  templateUrl: './portofolio-chart.component.html',
  styleUrls: ['./portofolio-chart.component.scss'],
})
export class PortofolioChartComponent {
  title = 'ng-chart';
  pieChart: any;

  ngOnInit() {
    this.createPieChart();
  }

  createPieChart() {
    const canvas: any = document.getElementById('pieCanvas');
    const ctx = canvas.getContext('2d');

    this.pieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['BTC', 'ETH', 'BNB', 'ADA', 'DOGE', 'LTC'], // Cryptos in portfolio
        datasets: [
          {
            label: 'Portfolio',
            data: [40, 30, 20, 10, 5, 15], // Portfolio distribution
            backgroundColor: Object.values(colorMap),
            borderColor: 'white',
            borderWidth: 1,
          },
        ],
      },
      options: {
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
