import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userBalanceSubject: BehaviorSubject<number> =
    new BehaviorSubject<number>(0);
  userBalance$: Observable<number> = this.userBalanceSubject.asObservable();

  constructor() {}

  setUserBalance(balance: number) {
    this.userBalanceSubject.next(balance);
  }

  getUserBalance(): Observable<number> {
    return this.userBalance$;
  }
}
