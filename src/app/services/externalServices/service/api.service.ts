import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  public apikey: string = '	CG-q4m72EDsY11q54LTdVgbWaxv';
  getCurrency(currency: string) {
    return this.http.get<any>(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&sparkline=false&x_cg_demo_api_key=${this.apikey}`
    );
  }
  getTrendingCurrency(currency: string) {
    return this.http.get<any>(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h&x_cg_demo_api_key=${this.apikey}`
    );
  }
  getGrpahicalCurrencyData(coinId: string, currency: string, days: number) {
    return this.http.get<any>(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency}&days=${days}&x_cg_demo_api_key=${this.apikey}`
    );
  }
  getCurrencyById(coinId: string) {
    return this.http.get<any>(
      `https://api.coingecko.com/api/v3/coins/${coinId}`
    );
  }
}
