import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}
  baseApiUrl: string = environment.baseApiUrl;

  login(loginObj: any) {
    return this.http.post<any>(`${this.baseApiUrl}/Auth/login`, loginObj).pipe(
      catchError((error) => {
        console.error('HTTP Error:', error);
        throw error; // rethrowing the error to propagate it to the subscriber
      })
    );
  }
}
