import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CurrencyValue } from '../models/currencyValue.model';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) {}

  getPortfolio(id: number): Observable<CurrencyValue[]> {
    return this.http.get<CurrencyValue[]>(`${this.baseApiUrl}/Portfolio/${id}`);
  }
}
