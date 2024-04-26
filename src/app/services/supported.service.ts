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

  saveSupported(currencies: string[], currencyType: string): Observable<any> {
    const data = {
      currencies: currencies,
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
