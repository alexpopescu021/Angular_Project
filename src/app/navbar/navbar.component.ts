import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {
  Observable,
  Subscription,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs';
import { ApiService } from '../services/externalServices/service/api.service';
import { LoginService } from '../services/login.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.None, // Add this line
})
export class NavbarComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  name: string | undefined;
  searchControl = new FormControl();
  filteredCoins: Observable<any> | undefined;
  private userSub: Subscription = new Subscription();
  userBalance: number = 5;
  private userBalanceSub: Subscription | undefined;

  constructor(
    private authService: LoginService,
    private apiService: ApiService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
    if (this.userBalanceSub) {
      this.userBalanceSub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.userService.setUserBalance(5);
    this.userBalanceSub = this.userService
      .getUserBalance()
      .subscribe((balance) => {
        this.userBalance = balance;
        console.log('User balance updated:', balance);
      });

    this.userSub = this.authService.userSub.subscribe((user) => {
      this.isAuthenticated = !!user;
      if (user) {
        this.name = user.username;
      }
    });

    this.filteredCoins = this.searchControl.valueChanges.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.apiService.searchCurrency(term))
    );
  }

  onLogout() {
    this.authService.logOut();
    this.name = undefined;
    this.userService.setUserBalance(0);
  }

  gotoDetails(row: any) {
    this.router.navigate(['coin-detail', row.id]);
  }
}
