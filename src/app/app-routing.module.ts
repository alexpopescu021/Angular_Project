import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupportedCurrenciesComponent } from './supported-currencies/supported-currencies.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { UserLoginComponent } from './user-login/user-login.component';

const routes: Routes = [
  { path: 'user', component: UserLoginComponent },
  { path: 'transactions', component: TransactionsComponent },
  { path: 'supported', component: SupportedCurrenciesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
