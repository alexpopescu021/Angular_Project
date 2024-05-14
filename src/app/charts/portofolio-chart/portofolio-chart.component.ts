import { Component } from '@angular/core';
import { Chart } from 'chart.js';
const colorMap = {
  BTC: 'gold',
  ETH: 'grey',
  ADA: 'RoyalBlue',
  BNB: 'yellow',
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
        labels: ['BTC', 'ETH', 'BNB', 'ADA'], // Cryptos in portfolio
        datasets: [
          {
            label: 'Portfolio',
            data: [40, 30, 20, 10], // Portfolio distribution
            backgroundColor: ['gold', 'grey', 'yellow', 'RoyalBlue'],
            borderColor: 'pink',
            borderWidth: 1,
            // Other options...
          },
        ],
      },
      options: {
        // Options...
      },
    });
  }
}
