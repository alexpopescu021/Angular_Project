import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  baseApiUrl: string = environment.baseApiUrl;

  // getdata() {
  //   return this.http.get<Transaction>(this.baseApiUrl + '/api/transactions');
  // }
  // login(userLogin: { email: string; password: string }): Observable<UserLogin> {
  //   return this.http.post<UserLogin>(this.baseApiUrl + '/api/users/login', [
  //     userLogin.email,
  //     userLogin.password,
  //   ]);
  // }
}
