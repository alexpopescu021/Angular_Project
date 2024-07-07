import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';
import { Subject, takeUntil } from 'rxjs';
import { Transaction } from '../models/transaction.model';
import { TransactionService } from '../services/transaction.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit {
  private ngUnsubscribe = new Subject<void>();

  TransactionsList: any = [];
  columns = [
    {
      columnDef: 'sourceCurrencyCode',
      header: 'Source',
      cell: (element: Transaction) =>
        this.sanitizer.bypassSecurityTrustHtml(
          element.sourceCurrencyCode === 'External'
            ? `<span style="color: #cf51df; font-weight: bold;">${element.sourceCurrencyCode}</span>`
            : `${element.sourcePrice} <span style="color: #cf51df; font-weight: bold;">${element.sourceCurrencyCode}</span>`
        ),
    },
    {
      columnDef: 'targetCurrencyCode',
      header: 'Target',
      cell: (element: Transaction) =>
        this.sanitizer.bypassSecurityTrustHtml(
          `${element.targetPrice} <span style="color: #cf51df; font-weight: bold;">${element.targetCurrencyCode}</span>`
        ),
    },
    {
      columnDef: 'transactionDate',
      header: 'TransactionDate',
      cell: (element: Transaction) =>
        this.datePipe.transform(element.transactionDate, "dd/MM/yy 'at' HH:mm"),
    },
    {
      columnDef: 'conversionRate',
      header: 'ConversionRate',
      cell: (element: Transaction) => `${element.conversionRate}`,
    },
  ];
  displayedColumns = this.columns.map((c) => c!.columnDef);

  constructor(
    public transactionService: TransactionService,
    private datePipe: DatePipe,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.loadTransactions();
  }

  loadTransactions() {
    this.transactionService
      .GetAllTransactions()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (data: {}) => {
          this.TransactionsList = data;
          console.log(data);
        },
        (error) => {
          console.error('Error:', error);
          //this.seedData();
        }
      );
  }

  seedData() {
    this.TransactionsList = [
      {
        sourceCurrencyCode: 'USD',
        targetCurrencyCode: 'BTC',
        transactionDate: new Date(),
        sourcePrice: 50000,
        targetPrice: 1,
        conversionRate: 50000,
      },
      {
        sourceCurrencyCode: 'BTC',
        targetCurrencyCode: 'ETH',
        transactionDate: new Date(),
        sourcePrice: 1,
        targetPrice: 30,
        conversionRate: 30,
      },
      {
        sourceCurrencyCode: 'ETH',
        targetCurrencyCode: 'USD',
        transactionDate: new Date(),
        sourcePrice: 30,
        targetPrice: 1500,
        conversionRate: 50,
      },
      {
        sourceCurrencyCode: 'BNB',
        targetCurrencyCode: 'BTC',
        transactionDate: new Date(),
        sourcePrice: 10,
        targetPrice: 0.2,
        conversionRate: 0.02,
      },
      {
        sourceCurrencyCode: 'ADA',
        targetCurrencyCode: 'ETH',
        transactionDate: new Date(),
        sourcePrice: 100,
        targetPrice: 2,
        conversionRate: 0.02,
      },
    ];
  }

  generatePdf() {
    const doc = new jsPDF();
    const columns = this.columns.map((column) => column.header);
    const rows = this.TransactionsList.map((transaction: Transaction) =>
      this.columns.map((column) => this.formatCellForPdf(column, transaction))
    );

    autoTable(doc, {
      head: [columns],
      body: rows,
      headStyles: { halign: 'center' },
      html: '#table',
    });

    doc.save('Transactions.pdf');
  }

  formatCellForPdf(column: any, transaction: Transaction) {
    switch (column.columnDef) {
      case 'sourceCurrencyCode':
        return transaction.sourceCurrencyCode === 'External'
          ? transaction.sourceCurrencyCode
          : `${transaction.sourcePrice} ${transaction.sourceCurrencyCode}`;
      case 'targetCurrencyCode':
        return `${transaction.targetPrice} ${transaction.targetCurrencyCode}`;
      case 'transactionDate':
        return this.datePipe.transform(
          transaction.transactionDate,
          "dd/MM/yy 'at' HH:mm"
        );
      case 'conversionRate':
        return `${transaction.conversionRate}`;
      default:
        return '';
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
