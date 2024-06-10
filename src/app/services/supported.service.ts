import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupportedService {
  constructor(private http: HttpClient) {}
  baseApiUrl: string = environment.baseApiUrl;

  getAllFiat(): Observable<any> {
    return this.http.get<any>(`${this.baseApiUrl}/Admin/getfiat`);
  }

  getAllCrypto(): Observable<any> {
    return this.http.get<any>(`${this.baseApiUrl}/Admin/getcrypto`);
  }

  getSupportedFiat(): Observable<any> {
    return this.http.get<any>(`${this.baseApiUrl}/Admin/getSupportedFiat`);
  }

  getSupportedCrypto(): Observable<any> {
    return this.http.get<any>(`${this.baseApiUrl}/Admin/getSupportedCrypto`);
  }

  saveSupported(currencies: string[], currencyType: string): Observable<any> {
    // Remove everything before the comma
    const modifiedCurrencies = currencies.map((currency) => {
      const index = currency.indexOf(':');
      return index !== -1 ? currency.substring(index + 1).trim() : currency;
    });

    const data = {
      currencies: modifiedCurrencies,
      currencyType: currencyType,
    };

    return this.http.post<any>(`${this.baseApiUrl}/Admin/addcurr`, data).pipe(
      catchError((error) => {
        console.error('HTTP Error:', error);
        return of({ error: true, message: `Error: ${error}` });
      })
    );
  }
}
