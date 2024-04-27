import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ConversionComponent } from './conversion/conversion.component';
import { DashComponent } from './dash/dash.component';
import { NewTransactionComponent } from './new-transaction/new-transaction.component';
import { ProfileComponent } from './profile/profile.component';
import { SupportedCryptoComponent } from './supported-crypto/supported-crypto.component';
import { SupportedFiatComponent } from './supported-fiat/supported-fiat.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  { path: 'transactions', component: TransactionsComponent },
  { path: 'supportedFiat', component: SupportedFiatComponent },
  { path: 'supportedCrypto', component: SupportedCryptoComponent },
  { path: 'dashboard', component: DashComponent },
  { path: 'user-list', component: UserListComponent },
  { path: 'new-transaction', component: NewTransactionComponent },
  { path: 'conversion', component: ConversionComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'profile', component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
