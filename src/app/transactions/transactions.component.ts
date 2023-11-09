import { Component, OnInit } from '@angular/core';
import { Transaction } from '../models/transaction.model';
import { TransactionService } from '../services/transaction.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent implements OnInit {
  TransactionsList: any = [];
  columns = [
    {
      columnDef: 'username',
      header: 'Username',
      cell: (element: Transaction) => `${element.username}`,
    },
    {
      columnDef: 'sourceCurrencyCode',
      header: 'SourceCurrency',
      cell: (element: Transaction) => `${element.sourceCurrencyCode}`,
    },
    {
      columnDef: 'targetCurrencyCode',
      header: 'TargetCurrency',
      cell: (element: Transaction) => `${element.targetCurrencyCode}`,
    },
    {
      columnDef: 'transactionDate',
      header: 'TransactionDate',
      cell: (element: Transaction) => `${element.transactionDate}`,
    },
    {
      columnDef: 'sourcePrice',
      header: 'SourcePrice',
      cell: (element: Transaction) => `${element.sourcePrice}`,
    },
    {
      columnDef: 'targetPrice',
      header: 'TargetPrice',
      cell: (element: Transaction) => `${element.targetPrice}`,
    },
    {
      columnDef: 'conversionRate',
      header: 'ConversionRate',
      cell: (element: Transaction) => `${element.conversionRate}`,
    },
  ];
  displayedColumns = this.columns.map((c) => c!.columnDef);

  constructor(public transactionService: TransactionService) {}

  ngOnInit() {
    this.loadTransactions();
  }

  loadTransactions() {
    var data = this.transactionService
      .GetAllTransactions()
      .subscribe((data: {}) => {
        this.TransactionsList = data;
      });
    return data;
  }
}
