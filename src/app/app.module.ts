import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgChartsModule } from 'ng2-charts';
import { AlertModule } from 'ngx-bootstrap/alert';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { LoadingSpinnerComponent } from 'src/shared/loading-spinner.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { ProfitChartComponent } from './charts/profit-chart/profit-chart.component';
import { ConversionComponent } from './conversion/conversion.component';
import { DashComponent } from './dash/dash.component';
import { ListComponent } from './list/list-component.component';
import { MaterialModule } from './material.module';
import { NavbarComponent } from './navbar/navbar.component';
import { NewTransactionComponent } from './new-transaction/new-transaction.component';
import { FilterItemsPipe } from './pipes/filterItems/filter-items.pipe';
import { ProfileComponent } from './profile/profile.component';
import { TransactionService } from './services/transaction.service';
import { SupportedCryptoComponent } from './supported-crypto/supported-crypto.component';
import { SupportedFiatComponent } from './supported-fiat/supported-fiat.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { UserListComponent } from './user-list/user-list.component';

import { CommonModule } from '@angular/common';
import { MarketChartComponent } from './charts/market-chart/market-chart.component';
import { PortofolioChartComponent } from './charts/portofolio-chart/portofolio-chart.component';
import { CoinDetailComponent } from './coin-detail/coin-detail.component';
import { CoinListComponent } from './coin-list/coin-list.component';
import { FooterComponent } from './footer/footer.component';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UserComponent,
    TransactionsComponent,
    ListComponent,
    SupportedFiatComponent,
    SupportedCryptoComponent,
    DashComponent,
    ProfitChartComponent,
    MarketChartComponent,
    PortofolioChartComponent,
    UserListComponent,
    NewTransactionComponent,
    ConversionComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    ProfileComponent,
    FooterComponent,
    CoinListComponent,
    CoinDetailComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    NgbDropdownModule,
    BrowserAnimationsModule,
    RouterModule,
    NgChartsModule,
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    CollapseModule.forRoot(),
    TabsModule.forRoot(),
    PaginationModule.forRoot(),
    AlertModule.forRoot(),
    BsDatepickerModule.forRoot(),
    CarouselModule.forRoot(),
    ModalModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    MaterialModule,
    FormsModule,
    LayoutModule,
    NgbModule,
  ],
  providers: [TransactionService, FilterItemsPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
