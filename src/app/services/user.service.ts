import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserDto } from '../auth/user.model';
import { UserUpdateDto } from '../models/userUpdateDto.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userBalanceSubject: BehaviorSubject<number> =
    new BehaviorSubject<number>(0);
  userBalance$: Observable<number> = this.userBalanceSubject.asObservable();
  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) {}

  setUserBalance(balance: number) {
    this.userBalanceSubject.next(balance);
  }

  getUserBalance(): Observable<number> {
    return this.userBalance$;
  }

  getUser(username: string): Observable<any> {
    return this.http.get<any>(`${this.baseApiUrl}/Auth/${username}`);
  }

  updateUser(
    username: string,
    userUpdateDto: UserUpdateDto
  ): Observable<UserDto> {
    return this.http.put<UserDto>(
      `${this.baseApiUrl}/Auth/${username}`,
      userUpdateDto
    );
  }
}
