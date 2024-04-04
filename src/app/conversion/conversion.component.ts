import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-conversion',
  templateUrl: './conversion.component.html',
  styleUrls: ['./conversion.component.scss'],
})
export class ConversionComponent implements OnInit {
  fromCurrency: string = 'USD';
  toCurrency: string = 'BTC';
  currencies: string[] = ['USD', 'EUR', 'GBP', 'JPY']; // Add your seeded data

  constructor() {}

  ngOnInit(): void {}
  swapCurrencies(): void {
    // Swap logic
    const temp = this.fromCurrency;
    this.fromCurrency = this.toCurrency;
    this.toCurrency = temp;
  }
  performConversion(): void {
    // Implement logic to handle conversion
  }
}
