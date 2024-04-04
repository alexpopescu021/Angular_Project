import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ConversionComponent } from './conversion/conversion.component';
import { DashComponent } from './dash/dash.component';
import { NewTransactionComponent } from './new-transaction/new-transaction.component';
import { SupportedFiatComponent } from './supported-fiat/supported-fiat.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserLoginComponent } from './user-login/user-login.component';

const routes: Routes = [
  { path: 'user', component: UserLoginComponent },
  { path: 'transactions', component: TransactionsComponent },
  { path: 'supported', component: SupportedFiatComponent },
  { path: 'dashboard', component: DashComponent },
  { path: 'user-list', component: UserListComponent },
  { path: 'new-transaction', component: NewTransactionComponent },
  { path: 'conversion', component: ConversionComponent },
  { path: 'auth', component: AuthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
