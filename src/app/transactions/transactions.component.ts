import { Component, OnInit } from '@angular/core';
import { Transaction } from '../models/transaction.model';
import { TransactionService } from '../services/transaction.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
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
    this.transactionService.GetAllTransactions().subscribe(
      (data: {}) => {
        this.TransactionsList = data;
      },
      (error) => {
        console.error('Error:', error);
        this.seedData();
      }
    );
  }

  seedData() {
    this.TransactionsList = [
      {
        username: 'User1',
        sourceCurrencyCode: 'USD',
        targetCurrencyCode: 'BTC',
        transactionDate: new Date(),
        sourcePrice: 50000,
        targetPrice: 1,
        conversionRate: 50000,
      },
      {
        username: 'User2',
        sourceCurrencyCode: 'BTC',
        targetCurrencyCode: 'ETH',
        transactionDate: new Date(),
        sourcePrice: 1,
        targetPrice: 30,
        conversionRate: 30,
      },
      {
        username: 'User3',
        sourceCurrencyCode: 'ETH',
        targetCurrencyCode: 'USD',
        transactionDate: new Date(),
        sourcePrice: 30,
        targetPrice: 1500,
        conversionRate: 50,
      },
      {
        username: 'User4',
        sourceCurrencyCode: 'BNB',
        targetCurrencyCode: 'BTC',
        transactionDate: new Date(),
        sourcePrice: 10,
        targetPrice: 0.2,
        conversionRate: 0.02,
      },
      {
        username: 'User5',
        sourceCurrencyCode: 'ADA',
        targetCurrencyCode: 'ETH',
        transactionDate: new Date(),
        sourcePrice: 100,
        targetPrice: 2,
        conversionRate: 0.02,
      },
      // ... add more seeded transactions as needed ...
    ];
  }
}
