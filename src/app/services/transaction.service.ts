import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
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

  GetConvertedAmount(
    from: string,
    to: string,
    amount: number | undefined
  ): Observable<number> {
    return this.http.get<number>(
      this.baseApiUrl + `/Transactions/convert/${from}/${to}/${amount}`
    );
  }

  Convert(value: any): Observable<number> {
    return this.http
      .post<number>(`${this.baseApiUrl}/Transactions/convert`, value)
      .pipe(
        catchError((error: any) => {
          // Handle errors here
          console.error('Error:', error);
          throw error; // Rethrow the error to propagate it
        })
      );
  }
}
