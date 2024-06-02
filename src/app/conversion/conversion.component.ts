import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
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
    'BTC',
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
  showConfirmation: boolean = false;

  value: number = 0;
  amount: number | undefined = undefined; // Initialize the amount as undefined
  toAmount: number = 0;
  isAmountInvalid: boolean = false;
  @ViewChild('currencyInput') currencyInput!: ElementRef;
  @ViewChild('amountInput') amountInput!: ElementRef;
  private batchSize: number = 5;
  private fromCursor: number = 0;
  private toCursor: number = 0;

  constructor(private transactionService: TransactionService) {}

  ngOnInit() {
    this.amount = 0;
    this.getBalance(this.fromCurrency);
    this.loadMoreCurrencies('from');
    this.loadMoreCurrencies('to');
  }

  swapCurrencies() {
    const temp = this.fromCurrency;
    this.fromCurrency = this.toCurrency;
    this.toCurrency = temp;
    this.getBalance(this.fromCurrency);
  }

  openConfirmationModal() {
    this.showConfirmation = true;
    this.getConvertedAmount();
  }

  cancelConversion() {
    this.showConfirmation = false;
  }

  confirmConversion() {
    const conversionDto = {
      sourceCurrencyCode: this.fromCurrency,
      targetCurrencyCode: this.toCurrency,
      sourceValue: this.amount, // Example value, adjust as needed
      targetValue: this.toAmount, // Example value, adjust as needed
      conversionFee: 1, // Example value, adjust as needed
    };

    this.transactionService.Convert(conversionDto).subscribe({
      next: (result: number) => {
        console.log('Conversion successful:', result);
        // Handle the result here if needed
      },
      error: (error: any) => {
        console.error('Error:', error);
        // Handle errors here
      },
      complete: () => {
        console.log('Conversion completed');
        // Handle completion if needed
      },
    });

    this.showConfirmation = false;
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
      this.getBalance(this.fromCurrency);
    } else {
      this.toCurrency = currency;
    }
    this.closeCurrencyModal(type);
  }

  clearAmount() {
    this.amount = undefined; // Set the amount to an empty string when the input field is clicked
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
    this.transactionService.GetBalanceOfCurrency(currency).subscribe((res) => {
      this.value = res || 0; // Set to 0 if no value is returned
      this.validateAmount(); // Re-validate the amount when the portfolio value changes
    });
  }

  isValueZero(): boolean {
    return this.value === 0;
  }

  validateAmount() {
    if (this.amount !== undefined && this.value !== undefined) {
      this.isAmountInvalid = this.amount > this.value;
    } else {
      this.isAmountInvalid = false; // Handle the case when either amount or value is undefined
    }
  }

  getConvertedAmount() {
    this.transactionService
      .GetConvertedAmount(this.fromCurrency, this.toCurrency, this.amount)
      .subscribe({
        next: (res) => {
          this.toAmount = res || 0; // Set to 0 if no value is returned
          console.log('Conversion result:', this.toAmount); // Log the value after it is set
        },
        error: (err) => {
          console.error('Error fetching conversion amount:', err); // Log any errors
        },
      });
  }

  showDropdown: { [key: string]: boolean } = {
    from: false,
    to: false,
  };

  toggleDropdown(type: string) {
    this.showDropdown[type] = !this.showDropdown[type];
  }

  focusInputs() {
    const currencyInput = document.getElementById(
      'fromCurrency'
    ) as HTMLInputElement;
    const amountInput = document.getElementById('amount') as HTMLInputElement;
    currencyInput.classList.add('focus');
    amountInput.classList.add('focus');
  }

  @HostListener('document:click', ['$event'])
  handleClick(event: MouseEvent) {
    if (
      !this.currencyInput.nativeElement.contains(event.target) &&
      !this.amountInput.nativeElement.contains(event.target)
    ) {
      this.getConvertedAmount();
    }
  }
}
