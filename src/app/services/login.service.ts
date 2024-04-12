import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, of, tap } from 'rxjs';
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

  handleError(error: any) {
    console.error('HTTP Error:', error);
    return of({ error: true, message: `Error: ${error}` });
  }

  login(loginObj: UserDto) {
    return this.http.post<any>(`${this.baseApiUrl}/Auth/login`, loginObj).pipe(
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
