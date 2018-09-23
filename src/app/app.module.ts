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
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GenericTablePageComponent } from './shared/search-table/search-table.component';
import { FilterTableComponent } from './shared/filter-table/filter-table.component';

import {TableModule} from 'primeng/table';
import {PaginatorModule} from 'primeng/paginator';
import { AccountDetailComponent } from './components/account-detail/account-detail.component';
import { CoreModule } from './core/core.module';
import {FileUploadModule} from 'primeng/fileupload';
import { NewAccountComponent } from './components/account-new/account-new.component';
import { EditAccountComponent } from './components/account-edit/account-edit.component';

@NgModule({
  declarations: [
    SidebarComponent,
    AppComponent,
    AccountsComponent,
    ItemsComponent,
    LoansComponent,
    RedemptionsComponent,
    RenewalsComponent,
    TopnavComponent,
    DashboardComponent,
    GenericTablePageComponent,
    FilterTableComponent,
    AccountDetailComponent,
    NewAccountComponent,
    EditAccountComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    TableModule,
    PaginatorModule,
    CoreModule,
    FileUploadModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
