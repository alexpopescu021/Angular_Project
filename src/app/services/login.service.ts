import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserDto } from '../auth/user.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient, private router: Router) {}
  baseApiUrl: string = environment.baseApiUrl;
  public userSub: BehaviorSubject<any | UserDto> = new BehaviorSubject<
    any | UserDto
  >(null);

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      // here we are assuming the backend returns just a string.
      errorMessage = `Error: ${error.error}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  login(loginObj: UserDto) {
    return this.http.post<any>(`${this.baseApiUrl}/Auth/login`, loginObj).pipe(
      catchError(this.handleError),
      tap((resData) => {
        if (resData && resData.username && resData.password) {
          const user = new UserDto(resData.username, resData.password);
          this.userSub.next(user);
          localStorage.setItem('userData', JSON.stringify(resData));
        } else {
          console.error('Invalid response data format');
          throw new Error('Invalid response data format');
        }
      })
    );
  }

  register(loginObj: UserDto) {
    return this.http
      .post<any>(`${this.baseApiUrl}/Auth/register`, loginObj)
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          if (resData && resData.username && resData.password) {
            const user = new UserDto(resData.username, resData.password);
            this.userSub.next(user);
          } else {
            console.error('Invalid response data format');
            throw new Error('Invalid response data format');
          }
        })
      );
  }

  logOut() {
    localStorage.clear();
    this.userSub.next(null);
    this.router.navigate(['/auth']);
  }

  autoLogin() {
    let userDataLocal = localStorage.getItem('userData');
    if (userDataLocal !== null) {
      const userData: {
        username: string;
        _password: string;
      } | null = JSON.parse(userDataLocal);

      if (!userData) {
        return;
      }
      const loadedUser = new UserDto(userData.username, userData._password);

      // use token here -- Adding Auto-Login
      if (loadedUser) {
        this.userSub.next(loadedUser);
      }
    }
  }
}
