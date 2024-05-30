import { Component } from '@angular/core';

@Component({
  selector: 'app-new-transaction',
  templateUrl: './new-transaction.component.html',
  styleUrls: ['./new-transaction.component.scss'],
})
export class NewTransactionComponent {
  transactionType: string = 'BankTransaction';
  amount: string = '';
  iban: string = '';
  cardNumber: string = '';

  onTransactionTypeChange() {
    // Clear the additional input fields when the transaction type changes
    this.iban = '';
    this.cardNumber = '';
  }

  sendTransaction() {
    // Handle the send transaction logic here
    const transactionData: any = {
      transactionType: this.transactionType,
      amount: this.amount,
    };

    if (this.transactionType === 'BankTransaction') {
      transactionData.iban = this.iban;
    } else if (this.transactionType === 'Card') {
      transactionData.cardNumber = this.cardNumber;
    }

    console.log('Transaction Data:', transactionData);
    // Implement the actual send logic here, e.g., make an API call
  }
}
