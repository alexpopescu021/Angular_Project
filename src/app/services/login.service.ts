import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, catchError, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserDto } from '../auth/user.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}
  baseApiUrl: string = environment.baseApiUrl;
  user = new Subject<UserDto>();

  login(loginObj: UserDto) {
    return this.http.post<any>(`${this.baseApiUrl}/Auth/login`, loginObj).pipe(
      catchError((error) => {
        console.error('HTTP Error:', error);
        throw error; // rethrowing the error to propagate it to the subscriber
      }),
      tap((resData) => {
        console.log('Response Data:', resData); // Log response data to see its structure

        if (resData && resData.username && resData.password) {
          const user = new UserDto(resData.username, resData.password);
          this.user.next(user);
        } else {
          console.error('Invalid response data format');
          throw new Error('Invalid response data format');
        }
      })
    );
  }

  register(loginObj: any) {
    return this.http
      .post<any>(`${this.baseApiUrl}/Auth/register`, loginObj)
      .pipe(
        catchError((error) => {
          console.error('HTTP Error:', error);
          throw error; // rethrowing the error to propagate it to the subscriber
        }),
        tap((resData) => {
          const user = new UserDto(resData.username, resData.password);
          this.user.next(user);
        })
      );
  }
}
