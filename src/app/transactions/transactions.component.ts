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

  availableCurrencies: string[] = [];
  selectedCurrencies: string[] = [];
  TransactionsList: Transaction[] = [];
  filteredTransactions: Transaction[] = [];
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
  displayedColumns = this.columns.map((c) => c.columnDef);

  constructor(
    public transactionService: TransactionService,
    private datePipe: DatePipe,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.loadTransactions();
  }

  populateAvailableCurrencies() {
    const sourceCurrencies = this.TransactionsList.map(
      (t: Transaction) => t.sourceCurrencyCode
    );
    const targetCurrencies = this.TransactionsList.map(
      (t: Transaction) => t.targetCurrencyCode
    );

    this.availableCurrencies = Array.from(
      new Set([...sourceCurrencies, ...targetCurrencies])
    );
  }

  applyCurrencyFilter(selectedCurrencies: string[]) {
    this.selectedCurrencies = selectedCurrencies;
    this.filteredTransactions = this.TransactionsList.filter(
      (transaction) =>
        this.selectedCurrencies.length === 0 ||
        this.selectedCurrencies.includes(transaction.sourceCurrencyCode) ||
        this.selectedCurrencies.includes(transaction.targetCurrencyCode)
    );
  }

  clearFilter() {
    this.selectedCurrencies = [];
    this.filteredTransactions = [...this.TransactionsList];
  }

  loadTransactions() {
    this.transactionService
      .GetAllTransactions()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (data: any) => {
          this.TransactionsList = data;
          this.filteredTransactions = [...this.TransactionsList];
          this.populateAvailableCurrencies();
        },
        (error) => {
          console.error('Error:', error);
          // this.seedData();
        }
      );
  }

  onCurrencyChange(event: any) {
    const currency = event.target.value;
    if (event.target.checked) {
      this.selectedCurrencies.push(currency);
    } else {
      this.selectedCurrencies = this.selectedCurrencies.filter(
        (c) => c !== currency
      );
    }
    this.applyCurrencyFilter(this.selectedCurrencies);
  }

  seedData() {
    this.TransactionsList = [
      // Your seed data here
    ];
    this.filteredTransactions = [...this.TransactionsList];
  }

  generatePdf() {
    const doc = new jsPDF();
    const columns = this.columns.map((column) => column.header);
    const rows = this.filteredTransactions.map((transaction: Transaction) =>
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
