import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SnackbarService } from '../services/snackbar.service';
import { TransactionService } from '../services/transaction.service';

@Component({
  selector: 'app-new-transaction',
  templateUrl: './new-transaction.component.html',
  styleUrls: ['./new-transaction.component.scss'],
})
export class NewTransactionComponent {
  transactionType: string = 'BankTransaction';
  amount: number = 0;
  iban: string = '';
  cardNumber: string = '';
  showConfirmation: boolean = false;

  /**
   *
   */
  constructor(
    private snackbarService: SnackbarService,
    private transactionService: TransactionService
  ) {}
  onTransactionTypeChange() {
    // Clear the additional input fields when the transaction type changes
    this.iban = '';
    this.cardNumber = '';
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.markFormGroupTouched(form);
      return;
    }
  }

  sendTransaction() {
    if (this.transactionType === 'Card') {
      const tax = 0.007;
      const taxedAmount = this.amount * (1 + tax);
      console.log(`Sending card transaction with amount: ${taxedAmount} €`);

      const transactionPayload = {
        transactionType: 'Card',
        Iban: this.iban,
        amount: taxedAmount,
      };

      this.transactionService
        .createExternalTransaction(transactionPayload)
        .subscribe({
          next: (response: any) => {
            console.log('Card transaction response:', response);
            this.snackbarService.open('Transaction success', 'Close', 3000, [
              'success-snackbar',
            ]);
          },
          error: (error) => {
            console.error('Error in card transaction:', error);
          },
        });
    } else if (this.transactionType === 'BankTransaction') {
      console.log(`Sending bank transaction with amount: ${this.amount} €`);

      const transactionPayload = {
        transactionType: 'BankTransaction',
        amount: this.amount,
      };

      this.transactionService
        .createExternalTransaction(transactionPayload)
        .subscribe(
          (response) => {
            console.log('Bank transaction response:', response);
            this.snackbarService.open('Transaction success', 'Close', 3000, [
              'success-snackbar',
            ]);
          },
          (error) => {
            console.error('Error in bank transaction:', error);
          }
        );
    }
  }

  cancelTransaction() {
    this.showConfirmation = false;
  }

  confirmTransaction() {
    this.sendTransaction();

    this.showConfirmation = false;
  }

  openConfirmationModal() {
    this.showConfirmation = true;
  }

  private markFormGroupTouched(formGroup: NgForm) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.control.get(field);
      if (control) {
        control.markAsTouched({ onlySelf: true });
      }
    });
  }
}
