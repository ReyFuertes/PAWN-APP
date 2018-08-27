import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AccountComponent } from './components/accounts/accounts.component';
import { ItemsComponent } from './components/items/items.component';
import { LoansComponent } from './components/loans/loans.component';
import { RedemptionComponent } from './components/redemption/redemption.component';
import { RenewalComponent } from './components/renewal/renewal.component';

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    ItemsComponent,
    LoansComponent,
    RedemptionComponent,
    RenewalComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
