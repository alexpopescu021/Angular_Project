import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { MaterialModule } from './material.module';
import { NavbarComponent } from './navbar/navbar.component';
import { TransactionService } from './services/transaction.service';
import { TransactionsComponent } from './transactions/transactions.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UserComponent,
    UserLoginComponent,
    DropdownComponent,
    TransactionsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    MaterialModule,
    FormsModule,
  ],
  providers: [TransactionService],
  bootstrap: [AppComponent],
})
export class AppModule {}
