import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { ItemsComponent } from './components/items/items.component';
import { LoansComponent } from './components/loans/loans.component';
import { RedemptionsComponent } from './components/redemptions/redemptions.component';
import { RenewalsComponent } from './components/renewals/renewals.component';
import { RoutingModule } from './routing';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopnavComponent } from './components/topnav/topnav.component';

@NgModule({
  declarations: [
    SidebarComponent,
    AppComponent,
    AccountsComponent,
    ItemsComponent,
    LoansComponent,
    RedemptionsComponent,
    RenewalsComponent,
    TopnavComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
