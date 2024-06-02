import { Component, HostListener, OnInit } from '@angular/core';
import { TransactionService } from '../services/transaction.service';

@Component({
  selector: 'app-conversion',
  templateUrl: './conversion.component.html',
  styleUrls: ['./conversion.component.scss'],
})
export class ConversionComponent implements OnInit {
  fromCurrency: string = 'USD';
  toCurrency: string = 'BTC';
  currencies: string[] = [
    'USD',
    'EUR',
    'GBP',
    'JPY',
    'CAD',
    'AUD',
    'CHF',
    'CNY',
    'SEK',
    'NZD',
    'MXN',
    'SGD',
    'HKD',
    'NOK',
    'KRW',
    'TRY',
    'RUB',
    'INR',
    'BRL',
    'ZAR',
    // Add more currencies as needed
  ];

  displayedCurrenciesFrom: string[] = [];
  displayedCurrenciesTo: string[] = [];

  isFromModalOpen: boolean = false;
  isToModalOpen: boolean = false;
  value: number = 0;
  private batchSize: number = 5;
  private fromCursor: number = 0;
  private toCursor: number = 0;

  constructor(private transService: TransactionService) {}

  ngOnInit() {
    this.getBalance(this.fromCurrency);
    this.loadMoreCurrencies('from');
    this.loadMoreCurrencies('to');
  }

  performConversion() {
    console.log(`Converting from ${this.fromCurrency} to ${this.toCurrency}`);
  }

  swapCurrencies() {
    const temp = this.fromCurrency;
    this.fromCurrency = this.toCurrency;
    this.toCurrency = temp;
  }

  openCurrencyModal(type: 'from' | 'to') {
    if (type === 'from') {
      this.isFromModalOpen = true;
    } else {
      this.isToModalOpen = true;
    }
  }

  closeCurrencyModal(type: 'from' | 'to') {
    if (type === 'from') {
      this.isFromModalOpen = false;
    } else {
      this.isToModalOpen = false;
    }
  }

  selectCurrency(currency: string, type: 'from' | 'to') {
    if (type === 'from') {
      this.fromCurrency = currency;
    } else {
      this.toCurrency = currency;
    }
    this.getBalance(this.fromCurrency);
    this.closeCurrencyModal(type);
  }

  onScroll(type: 'from' | 'to') {
    const modalBody = document.querySelector(
      type === 'from'
        ? '#fromCurrencyModal .modal-dialog'
        : '#toCurrencyModal .modal-dialog'
    ) as HTMLElement;
    if (
      modalBody.scrollTop + modalBody.clientHeight >=
      modalBody.scrollHeight
    ) {
      this.loadMoreCurrencies(type);
    }
  }

  private loadMoreCurrencies(type: 'from' | 'to') {
    if (type === 'from') {
      const nextBatch = this.currencies.slice(
        this.fromCursor,
        this.fromCursor + this.batchSize
      );
      this.displayedCurrenciesFrom =
        this.displayedCurrenciesFrom.concat(nextBatch);
      this.fromCursor += this.batchSize;
    } else {
      const nextBatch = this.currencies.slice(
        this.toCursor,
        this.toCursor + this.batchSize
      );
      this.displayedCurrenciesTo = this.displayedCurrenciesTo.concat(nextBatch);
      this.toCursor += this.batchSize;
    }
  }

  @HostListener('scroll', ['$event'])
  onModalScroll(event: Event) {
    event.stopPropagation();
  }

  private getBalance(currency: string) {
    this.transService.GetBalanceOfCurrency(currency).subscribe((res) => {
      this.value = res || 0; // Set to 0 if no value is returned
    });
  }

  isValueZero(): boolean {
    return this.value === 0;
  }
}
