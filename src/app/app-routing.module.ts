import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { CoinDetailComponent } from './coin-detail/coin-detail.component';
import { CoinListComponent } from './coin-list/coin-list.component';
import { ConversionComponent } from './conversion/conversion.component';
import { DashComponent } from './dash/dash.component';
import { LandingComponent } from './landing/landing.component';
import { NewTransactionComponent } from './new-transaction/new-transaction.component';
import { ProfileComponent } from './profile/profile.component';
import { SupportedCryptoComponent } from './supported-crypto/supported-crypto.component';
import { SupportedFiatComponent } from './supported-fiat/supported-fiat.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  {
    path: 'transactions',
    component: TransactionsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'supportedFiat',
    component: SupportedFiatComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'supportedCrypto',
    component: SupportedCryptoComponent,
    canActivate: [AuthGuard],
  },
  { path: 'dashboard', component: DashComponent, canActivate: [AuthGuard] },
  { path: 'user-list', component: UserListComponent },
  { path: 'new-transaction', component: NewTransactionComponent },
  {
    path: 'conversion',
    component: ConversionComponent,
    canActivate: [AuthGuard],
  },
  { path: 'auth', component: AuthComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'coin-list', component: CoinListComponent, canActivate: [AuthGuard] },
  {
    path: 'coin-detail/:id',
    component: CoinDetailComponent,
    canActivate: [AuthGuard],
  },
  { path: 'landing', component: LandingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
