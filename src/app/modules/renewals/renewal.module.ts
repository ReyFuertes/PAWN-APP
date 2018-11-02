import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ModalService } from '../../services/modal.service';
import { MessageService } from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../shared/shared.module';
import { RenewalListComponent } from './components/renewal-list/renewal-list.component';
import { RenewalDetailComponent } from './components/renewal-detail/renewal-detail.component';
import { RenewalEditComponent } from './components/renewal-edit/renewal-edit.component';
import { RenewalNewComponent } from './components/renewal-new/renewal-new.component';
import { RenewalService } from './renewal.service';
import { RenewalTableComponent } from './components/renewal-table/renewal-table.component';
import { AccountService } from '../accounts/account.service';
import { ItemService } from '../items/item.service';
import {TabViewModule} from 'primeng/tabview';
import { PawnService } from '../pawns/pawn.service';

export const routes: Routes = [
  {
    path: 'renewals',
    component: RenewalListComponent
  }
];

const primengModules = [FileUploadModule, ToastModule, TabViewModule];

@NgModule({
  declarations: [ 
    RenewalListComponent,
    RenewalTableComponent,
    RenewalDetailComponent,
    // RenewalEditComponent,
    RenewalNewComponent
  ],
  imports: [ 
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    ...primengModules,

    RouterModule.forChild(routes)
   ],
  exports: [],
  providers: [PawnService, ItemService, AccountService, RenewalService, ModalService, MessageService],
})
export class RenewalModule {}

