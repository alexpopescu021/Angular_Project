import { Component, OnDestroy, OnInit } from '@angular/core';
import { ISeriesApi, createChart } from 'lightweight-charts';

@Component({
  selector: 'app-trade-chart',
  templateUrl: './trade-chart.component.html',
  styleUrls: ['./trade-chart.component.scss'],
})
export class TradeChartComponent implements OnInit, OnDestroy {
  private chart: any;
  private lineSeries!: ISeriesApi<'Line'>;
  private markers: any[] = [];

  constructor() {}

  ngOnDestroy(): void {
    this.chart.remove();
  }

  ngOnInit() {
    const container = document.getElementById('chart-container');

    if (container !== null) {
      this.chart = createChart(container, {
        width: 400,
        height: 300,
      });
    } else {
      console.error('Could not find element with id "chart-container"');
    }

    this.lineSeries = this.chart.addLineSeries();
    this.updateChart('btc', '1d');
  }

  updateChart(crypto: string, timeframe: string) {
    let data = [];
    let startDate = new Date('2024-01-01');
    let endDate = new Date('2024-12-31');
    let currentValue = crypto === 'btc' ? 30000 : 1000;

    // Remove the old series before adding a new one
    if (this.lineSeries) {
      this.chart.removeSeries(this.lineSeries);
    }

    this.lineSeries = this.chart.addLineSeries();

    this.chart.timeScale().options().tickMarkFormatter = (
      time: number,
      _tickMarkType: any,
      _locale: any
    ) => {
      const date = new Date(time * 1000);
      if (timeframe === '1d' || timeframe === '7d') {
        return date.getHours() + ':' + date.getMinutes();
      } else if (timeframe === '1m') {
        return (
          date.getDate() +
          ' ' +
          date.toLocaleString('default', { month: 'short' })
        );
      }
      return date.toLocaleString();
    };

    for (
      let d = Date.UTC(
        startDate.getUTCFullYear(),
        startDate.getUTCMonth(),
        startDate.getUTCDate()
      );
      d <= endDate.getTime();
      d += 24 * 60 * 60 * 1000
    ) {
      currentValue +=
        Math.random() < 0.5 ? -Math.random() * 200 : Math.random() * 200;
      data.push({
        time: new Date(d).toISOString().split('T')[0],
        value: currentValue,
      });
    }

    this.lineSeries.setData(data);
  }
}
