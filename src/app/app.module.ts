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

const appRoutes: Routes = [
  {
    path: "",
    component: DefaultLayoutComponent
  },
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
    path: "auth/login",
    component: LoginComponent
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
    DashboardComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    CoreModule,
    FileUploadModule
  ],
  providers: [AuthGuard, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule {}
