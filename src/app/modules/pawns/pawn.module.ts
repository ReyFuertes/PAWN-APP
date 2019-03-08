import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PawnService } from './pawn.service';
import { Routes, RouterModule } from '@angular/router';
import { PawnListComponent } from './components/pawn-list/pawn-list.component';
import { ModalService } from '../../services/modal.service';
import { MessageService } from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from '../../core/core.module';
import { PawnTableComponent } from './components/pawn-table/pawn-table.component';
import { SharedModule } from '../../shared/shared.module';
import { PawnNewComponent } from './components/pawn-new/pawn-new.component';
import { PawnEditComponent } from './components/pawn-edit/pawn-edit.component';
import { PawnDetailComponent } from './components/pawn-detail/pawn-detail.component';
import { AccountService } from '../accounts/account.service';
import { ItemService } from '../items/item.service';
import {TabViewModule} from 'primeng/tabview';

export const routes: Routes = [
  {
    path: 'pawns',
    component: PawnListComponent
  },
  {
    path: 'pawn/add',
    component: PawnNewComponent
  },
  {
    path: 'pawn/edit/:id',
    component: PawnEditComponent
  }
];

const primengModules = [FileUploadModule, ToastModule, TabViewModule];

@NgModule({
  declarations: [ 
    PawnListComponent,
    PawnTableComponent,
    PawnNewComponent,
    PawnEditComponent,
    PawnDetailComponent
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
  providers: [PawnService, AccountService, ItemService, ModalService, MessageService],
})
export class PawnModule {}

