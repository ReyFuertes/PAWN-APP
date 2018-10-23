import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { CoreModule } from "../../core/core.module";
import { FileUploadModule } from "primeng/fileupload";
import { Routes, RouterModule } from "@angular/router";
import { SharedModule } from "../../shared/shared.module";
import { AccountDetailComponent } from "./components/account-detail/account-detail.component";
import { AccountListComponent } from "./components/account-list/account-list.component";
import { AccountEditComponent } from "./components/account-edit/account-edit.component";
import { AccountNewComponent } from "./components/account-new/account-new.component";
import { AccountTableComponent } from "./components/account-table/account-table.component";
import { AccountService } from "./account.service";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { ModalService } from "../../services/modal.service";

export const routes: Routes = [
  {
    path: 'accounts',
    component: AccountListComponent
  }
];

@NgModule({
  declarations: [
    AccountDetailComponent,
    AccountEditComponent,
    AccountNewComponent,
    AccountTableComponent,
    AccountListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    FileUploadModule,

    RouterModule.forChild(routes)
  ],
  exports: [],
  providers: [AccountService, ModalService]
})
export class AccountModule {}
