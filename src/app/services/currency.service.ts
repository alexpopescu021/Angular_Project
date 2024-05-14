import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private url = 'https://api.example.com'; // Replace with your API URL
  private apiKey = 'Your-API-Key'; // Replace with your API key

  constructor(private http: HttpClient) {}
  baseApiUrl: string = environment.baseApiUrl;

  getSupportedFiat(): Observable<any> {
    return this.http.get<any>(`${this.baseApiUrl}/Currencies/fiat`);
  }

  getSupportedCrypto(): Observable<any> {
    return this.http.get<any>(`${this.baseApiUrl}/Currencies/crypto`).pipe(
      catchError((error) => {
        console.error('HTTP Error:', error);
        throw error; // rethrowing the error to propagate it to the subscriber
      })
    );
  }

  getCryptoData(crypto: string, timeframe: string) {
    const endpoint = `${this.url}/${crypto}/${timeframe}`;
    return this.http.get(endpoint, {
      headers: {
        'X-API-KEY': this.apiKey,
      },
    });
  }
}
