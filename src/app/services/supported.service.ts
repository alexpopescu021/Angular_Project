import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupportedService {
  constructor(private http: HttpClient) {}
  baseApiUrl: string = environment.baseApiUrl;

  loadAllFiat() {
    return this.http.get<any>(`${this.baseApiUrl}/Admin/fiat`).pipe(
      catchError((error) => {
        console.error('HTTP Error:', error);
        throw error; // rethrowing the error to propagate it to the subscriber
      })
    );
  }

  saveSupported(data: string[]) {
    return this.http
      .post<any>(`${this.baseApiUrl}/Admin/supported_fiat`, data)
      .pipe(
        catchError((error) => {
          console.error('HTTP Error:', error);
          throw error; // rethrowing the error to propagate it to the subscriber
        })
      );
  }
}
