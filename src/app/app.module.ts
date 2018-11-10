import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from "./app.component";
import { CoreModule } from "./core/core.module";
import { FileUploadModule } from "primeng/fileupload";
import { HttpClientModule } from "@angular/common/http";
import { Routes, RouterModule } from "@angular/router";
import { DefaultLayoutComponent } from "./pages/default-layout/default-layout.component";
import { CommonModule } from "@angular/common";
import { NoRouteComponent } from "./pages/noroute/noroute.component";
import { SidebarComponent } from "./shared/sidebar/sidebar.component";
import { LoginComponent } from "./pages/login/login.component";
import { AuthGuard } from "./services/auth.guard";
import { TopnavComponent } from "./shared/topnav/topnav.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginService } from "./services/auth.service";
import { DashboardComponent } from "./modules/dashboard/dashboard.component";
import { DashboardService } from "./services/dashboard.service";
import { SettingsComponent } from "./pages/settings/settings.component";
import { SlideMenuModule } from "primeng/slidemenu";
import { PrintPageComponent } from "./shared/print-page/print-page.component";
import { AccountPrintTableComponent } from "./modules/accounts/components/account-print-table/account-print-table.component";
import { AccountService } from "./modules/accounts/account.service";
import { PawnPrintTableComponent } from "./modules/pawns/components/pawn-print-table/pawn-print-table.component";
import { PawnService } from "./modules/pawns/pawn.service";
import { ItemPrintTableComponent } from "./modules/items/components/item-print-table/item-print-table.component";
import { ItemService } from "./modules/items/item.service";

const appRoutes: Routes = [
  {
    path: "dashboard",
    component: DefaultLayoutComponent,
    children: [
      {
        path: "",
        component: DashboardComponent
      }
    ],
    canActivate: [AuthGuard]
  },
  {
    path: "dashboard",
    component: DefaultLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: "./modules/accounts/account.module#AccountModule"
      }
    ],
    canActivate: [AuthGuard]
  },
  {
    path: "dashboard",
    component: DefaultLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: "./modules/pawns/pawn.module#PawnModule"
      }
    ],
    canActivate: [AuthGuard]
  },
  {
    path: "dashboard",
    component: DefaultLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: "./modules/items/item.module#ItemModule"
      }
    ],
    canActivate: [AuthGuard]
  },
  {
    path: "dashboard",
    component: DefaultLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: "./modules/renewals/renewal.module#RenewalModule"
      }
    ],
    canActivate: [AuthGuard]
  },
  {
    path: "dashboard",
    component: DefaultLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: "./modules/redemptions/redemption.module#RedemptionModule"
      }
    ],
    canActivate: [AuthGuard]
  },
  {
    path: "auth/login",
    component: LoginComponent
  },
  { 
    path: '', 
    redirectTo: 'dashboard', 
    pathMatch: 'full' 
  },
  {
    path: "print-page",
    component: PrintPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "**",
    component: NoRouteComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    DefaultLayoutComponent,
    NoRouteComponent,
    SidebarComponent,
    TopnavComponent,
    LoginComponent,
    DashboardComponent,
    SettingsComponent,
    PrintPageComponent,
    AccountPrintTableComponent,
    PawnPrintTableComponent,
    ItemPrintTableComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    CoreModule,
    FileUploadModule,
    SlideMenuModule
  ],
  providers: [AuthGuard, LoginService, DashboardService, AccountService, PawnService, ItemService],
  bootstrap: [AppComponent]
})
export class AppModule {}
