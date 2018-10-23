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
import { SharedModule } from "primeng/components/common/shared";
import { SidebarComponent } from "./shared/sidebar/sidebar.component";
import { TopnavComponent } from "./modules/topnav/topnav.component";

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
        loadChildren: "./modules/accounts/accounts.module#AccountModule"
      }
    ]
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
    TopnavComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    CoreModule,
    FileUploadModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
