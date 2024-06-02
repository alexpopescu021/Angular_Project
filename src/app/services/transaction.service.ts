import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Transaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(private http: HttpClient) {}
  baseApiUrl: string = environment.baseApiUrl;

  GetAllTransactions(): Observable<Transaction> {
    return this.http.get<Transaction>(this.baseApiUrl + '/Transactions/');
  }

  GetAllCoins(): Observable<any> {
    return this.http.get<any>(this.baseApiUrl + '/Currencies/');
  }

  GetBalanceOfCurrency(currency: string): Observable<any> {
    return this.http.get<any>(
      this.baseApiUrl + `/Transactions/currency/${currency}`
    );
  }
}
