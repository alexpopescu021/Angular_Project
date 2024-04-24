import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  open(
    message: string,
    action: string = 'Close',
    duration: number = 5000,
    panelClass: string[] = []
  ): void {
    const config: MatSnackBarConfig = new MatSnackBarConfig();
    config.duration = duration;
    config.panelClass = panelClass;
    config.horizontalPosition = 'end';
    config.verticalPosition = 'top';
    this.snackBar.open(message, action, config);
  }
}
