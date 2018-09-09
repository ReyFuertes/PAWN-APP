import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from './components/accounts/accounts.component';
import { RedemptionsComponent } from './components/redemptions/redemptions.component';
import { RenewalsComponent } from './components/renewals/renewals.component';
import { ItemsComponent } from './components/items/items.component';
import { LoansComponent } from './components/loans/loans.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const appRoutes: Routes = [
	{
    path: 'dashboard',
		children: [
      {
				path: '',
				component: DashboardComponent
      },
			{
				path: 'accounts',
				component: AccountsComponent
      },
      {
				path: 'loans',
				component: LoansComponent
      },
      {
				path: 'items',
				component: ItemsComponent
      },
      {
				path: 'renewals',
				component: RenewalsComponent
      },
      {
				path: 'redemptions',
				component: RedemptionsComponent
			}
		]
	},
	{
		path: '**',
		redirectTo: '',
		pathMatch: 'full'
	}
];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [ RouterModule ]
})
export class RoutingModule { }
