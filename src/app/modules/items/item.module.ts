import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ItemListComponent } from './components/item-list/item-list.component';
import { ModalService } from '../../services/modal.service';
import { MessageService } from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../shared/shared.module';
import { AccountService } from '../accounts/account.service';
import { ItemService } from '../items/item.service';
import { ItemTableComponent } from './components/item-table/item.table.component';
import { ItemNewComponent } from './components/item-new/item-new.component';
import { ItemEditComponent } from './components/item-edit/item-edit.component';
import { ItemDetailComponent } from './components/item-detail/item-detail.component';
import { TooltipModule } from 'primeng/tooltip';

export const routes: Routes = [
  {
    path: 'items',
    component: ItemListComponent
  }
];

const primengModules = [TooltipModule, FileUploadModule, ToastModule];

@NgModule({
  declarations: [
    ItemListComponent,
    ItemTableComponent,
    ItemNewComponent,
    ItemEditComponent,
    ItemDetailComponent
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
  providers: [ItemService, AccountService, ItemService, ModalService, MessageService],
})
export class ItemModule { }

