import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  name: string | undefined;
  private userSub: Subscription = new Subscription();
  constructor(private authService: LoginService) {}

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  ngOnInit(): void {
    this.userSub = this.authService.userSub.subscribe((user) => {
      this.isAuthenticated = !!user;
      if (user) {
        this.name = user.username;
      }
    });
  }

  onLogout() {
    this.authService.logOut();
    this.name = undefined;
  }
}
