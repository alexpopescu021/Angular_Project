import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { LoginService } from '../services/login.service';
import { SnackbarService } from '../services/snackbar.service';
import { UserDto } from './user.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = '';
  hidePassword = true;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.error = '';

    const loginObj = {
      username: form.value.username,
      password: form.value.password,
    } as UserDto;

    let authObs: Observable<any>;

    this.isLoading = true;
    if (this.isLoginMode) {
      authObs = this.loginService.login(loginObj);
    } else {
      authObs = this.loginService.register(loginObj);
    }

    authObs
      .pipe(
        catchError((error) => {
          console.log(error);
          this.error = error.error;
          this.isLoading = false;
          this.snackbarService.open(error, 'Close', 3000, ['error-snackbar']);
          return throwError(() => new Error(error));
        })
      )
      .subscribe(() => {
        this.isLoading = false;

        this.router.navigate(['/transactions']);
      });
    form.reset();
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
}
