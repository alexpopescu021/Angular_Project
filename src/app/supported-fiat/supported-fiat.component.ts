// app.component.ts
import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../services/currency.service';
import { SnackbarService } from '../services/snackbar.service';
import { SupportedService } from '../services/supported.service';

@Component({
  selector: 'app-supported',
  templateUrl: './supported-fiat.component.html',
  styleUrls: ['./supported-fiat.component.scss'],
})
export class SupportedFiatComponent implements OnInit {
  /**
   *
   */
  constructor(
    private supportedService: SupportedService,
    private currenciesService: CurrencyService,
    private snackbarService: SnackbarService
  ) {}
  leftList: any[] = [];

  rightList: any[] = [];

  ngOnInit(): void {
    this.supportedService.getAllFiat().subscribe((data) => {
      Object.entries(data).forEach(([key, value]) => {
        this.leftList.push(`${key}: ${value}`);
      });
      this.leftList.sort();
    });

    this.currenciesService.getSupportedFiat().subscribe((data) => {
      Object.entries(data).forEach(([, value]) => {
        const currencyValue = value as { currencyCode: string };
        if (currencyValue.currencyCode) {
          this.rightList.push(currencyValue.currencyCode);
        }
      });
      this.rightList.sort();
    });
  }

  saveData() {
    this.supportedService.saveSupported(this.rightList).subscribe({
      next: () => {
        console.log('Data saved successfully');
        // Display success snackbar
        this.snackbarService.open(
          'Data saved successfully',
          'Close',
          9999999999,
          ['success-snackbar']
        );
      },
      error: (error) => {
        console.error('Error saving data:', error);
        // Handle error here if needed
      },
    });
  }

  moveItem(item: string, direction: 'left' | 'right') {
    if (direction === 'left') {
      this.rightList = this.rightList.filter((i) => i !== item);
      this.leftList.push(item);
      this.leftList.sort();
    } else {
      this.leftList = this.leftList.filter((i) => i !== item);
      this.rightList.push(item);
      this.rightList.sort();
    }
  }
}
