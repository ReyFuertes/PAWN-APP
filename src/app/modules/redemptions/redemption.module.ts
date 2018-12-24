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
import { RedemptionListComponent } from './components/redemption-list/redemption-list.component';
import { RedemptionDetailComponent } from './components/redemption-detail/redemption-detail.component';
import { RedemptionEditComponent } from './components/redemption-edit/redemption-edit.component';
import { RedemptionNewComponent } from './components/redemption-new/redemption-new.component';
import { RedemptionService } from './redemption.service';
import { RedemptionTableComponent } from './components/redemption-table/redemption-table.component';
import { AccountService } from '../accounts/account.service';
import { ItemService } from '../items/item.service';
import {TabViewModule} from 'primeng/tabview';
import { PawnService } from '../pawns/pawn.service';

export const routes: Routes = [
  {
    path: 'redemptions',
    component: RedemptionListComponent
  }
];

const primengModules = [FileUploadModule, ToastModule, TabViewModule];

@NgModule({
  declarations: [ 
    RedemptionListComponent,
    RedemptionTableComponent,
    RedemptionDetailComponent,
    RedemptionEditComponent,
    RedemptionNewComponent
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
  providers: [PawnService, ItemService, AccountService, RedemptionService, ModalService, MessageService],
})
export class RedemptionModule {}

