import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
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

  saveSupported(data: string[]): Observable<any> {
    return this.http.post<any>(`${this.baseApiUrl}/Admin/addcurr`, data).pipe(
      catchError((error) => {
        console.error('HTTP Error:', error);
        throw error; // rethrowing the error to propagate it to the subscriber
      })
    );
  }
}
