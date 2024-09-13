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

  // BehaviorSubject for user data
  public userSub: BehaviorSubject<any | UserDto> = new BehaviorSubject<
    any | UserDto
  >(null);

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Backend returned an unsuccessful response code
      errorMessage = `Error: ${error.error}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  // Login method with token handling
  login(loginObj: UserDto) {
    return this.http.post<any>(`${this.baseApiUrl}/Auth/login`, loginObj).pipe(
      catchError(this.handleError),
      tap((resData) => {
        if (resData && resData.token && resData.username) {
          this.storeToken(resData.token);
          const user = new UserDto(resData.username, loginObj.password); // Password comes from input

          // Store user in BehaviorSubject
          this.userSub.next(user);

          // Store both token and user data in localStorage
          localStorage.setItem('userData', JSON.stringify(user));
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
          if (resData && resData.username) {
            const user = new UserDto(resData.username, loginObj.password);
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
    const userDataLocal = localStorage.getItem('userData');
    const token = this.getToken();

    if (userDataLocal !== null && token) {
      const userData: {
        username: string;
        _password: string;
      } | null = JSON.parse(userDataLocal);

      if (!userData) {
        return;
      }

      const loadedUser = new UserDto(userData.username, userData._password);

      // Check if user exists and token is present
      if (loadedUser) {
        this.userSub.next(loadedUser);
      }
    }
  }

  // Store the JWT token in localStorage
  private storeToken(token: string): void {
    localStorage.setItem('jwt', token);
  }

  // Retrieve the token from localStorage
  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  // Check if a token exists
  private hasToken(): boolean {
    return !!localStorage.getItem('jwt');
  }
}
