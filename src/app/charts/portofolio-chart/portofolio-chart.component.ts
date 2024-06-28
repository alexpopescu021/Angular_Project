import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { PortfolioService } from 'src/app/services/portoflio.service';

let themeColors = ['Purple', 'Pink', 'DarkBlue'];

function getThemeColor() {
  // If all colors have been used, reset the array
  if (themeColors.length === 0) {
    themeColors = ['Purple', 'Pink', 'DarkBlue'];
  }

  // Select a random color from the available ones
  const color = themeColors[Math.floor(Math.random() * themeColors.length)];

  // Remove the selected color from themeColors
  themeColors = themeColors.filter((c) => c !== color);

  return color;
}

@Component({
  selector: 'app-portofolio-chart',
  templateUrl: './portofolio-chart.component.html',
  styleUrls: ['./portofolio-chart.component.scss'],
})
export class PortofolioChartComponent implements OnInit {
  title = 'ng-chart';
  pieChart: any;

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit() {
    this.portfolioService.getPortfolio(1).subscribe((portfolio) => {
      // Filter out currencies with value 0
      const filteredPortfolio = portfolio.filter((cv) => cv.value !== 0);

      const labels = filteredPortfolio.map((cv) => cv.currency.currencyCode);
      const data = filteredPortfolio.map((cv) => cv.value);
      const backgroundColor = labels.map(() => getThemeColor());

      this.createPieChart(labels, data, backgroundColor);
    });
  }

  createPieChart(labels: string[], data: number[], backgroundColor: string[]) {
    const canvas: any = document.getElementById('pieCanvas');
    const ctx = canvas.getContext('2d');

    this.pieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels,
        datasets: [
          {
            label: 'Portfolio',
            data,
            backgroundColor,
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
          tooltip: {
            callbacks: {
              label: function (context) {
                var label = context.dataset.label || '';

                if (label) {
                  label += ': ';
                }
                if (context.parsed !== null) {
                  label += new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(context.parsed);
                }
                return label;
              },
            },
          },
        },
      },
    });
  }
}
