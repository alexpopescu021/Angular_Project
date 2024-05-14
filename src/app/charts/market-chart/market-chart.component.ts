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
        labels: ['BTC', 'ETH', 'BNB', 'ADA'], // Top 10 cryptos
        datasets: [
          {
            label: 'Market Cap',
            data: [1000, 2000, 1500, 3000], // Market cap data
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
