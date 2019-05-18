import { Component, OnInit, ViewChild } from "@angular/core";
import { AccountService, AccountEntityService } from "../../account.service";
import { PageVar } from "../../../../models/pages.model";
import { Account } from "../../../../models/account.model";
import { FormGroup, Validators, FormBuilder, NgForm } from "@angular/forms";
import { MessageService } from 'primeng/api';
import { Subject } from "rxjs";
import { AEMode } from "../../../../models/crud.enum";
import { AccountTableComponent } from "../account-table/account-table.component";
import { PrintEntity } from "../../../../models/print-entity.model";
import { environment } from "../../../../../environments/environment";
import { AccountDetailComponent } from "../account-detail/account-detail.component";
import { ActionService } from "../../../../services/action.service";
import { map, take } from "rxjs/operators";
import { ModalService } from "../../../../services/modal.service";

@Component({
  selector: "pa-account-list",
  templateUrl: "./account-list.component.html",
  styleUrls: ["./account-list.component.scss"]
})
export class AccountListComponent implements OnInit {
  public showModal: boolean = false;
  public accounts: Account[];
  public selections: Account[];
  public editMode: AEMode;
  public totalRecords: number;
  public aeMode: AEMode;

  public searchTerm$ = new Subject<string>();
  public printEntity = PrintEntity.Account;
  public selectedItem: any;
  public contentStyle: any = { 'width': '950px', 'overflow-x': 'hidden', 'min-height': '550px' };

  @ViewChild("accountTable") accountTable: AccountTableComponent;
  @ViewChild(AccountDetailComponent) accountDetailComponent: AccountDetailComponent;

  constructor(
    private accountEntityService: AccountEntityService,
    private accountService: AccountService,
    private messageService: MessageService,
    private actionService: ActionService,
    public modalService: ModalService
  ) {
    this.accountService.searchAccount(this.searchTerm$).subscribe(results => this.accounts = results.accounts);

    this.modalService.subscribe(this, this.onRefresh);
  }

  public load(pageVar: PageVar): void {
    this.accountService.getAccounts(pageVar).subscribe(response => {
      this.accounts = response.accounts;
      this.totalRecords = response.totalCount;
      console.log("%caccounts loaded..", "background:green;color:#fff");
    });
  }

  ngOnInit() {
    this.load({ limit: 10, offset: 0 });
  }

  public onSearch(event: any): void {
    this.searchTerm$.next(event.target.value)
  }

  public onRefresh(): void {
    this.load({ limit: 10, offset: 0 });
    this.accountTable.onRowUnselect();
  }

  public onClose(event: boolean = false): void {
    this.showModal = event;

    if (!this.showModal) {
      this.load({ limit: 10, offset: 0 });
    }
    this.accountTable.onRowUnselect();
  }

  public onAdd(): void {
    this.actionService.setEntity(AEMode.add);
    this.showModal = !this.showModal;
  }

  public save(): void {
    this.showModal = false;
    this.accountDetailComponent.onSubmit();
    this.onRefresh();
  }

  public onEdit(): void {
    if (this.selections[0].id) {
      this.actionService.setEntity(AEMode.edit);
      this.showModal = !this.showModal;

      this.accountService.editAccount(this.selections[0].id).pipe(map(acc => acc.accounts), take(1)).subscribe(account => {
        this.accountEntityService.setEntity(account);
      });
    }
  }

  public onDelete(): void {
    this.showConfirm();
  }

  public paginate(event: any): void {
    this.load({ limit: event.rows, offset: event.first });
  }

  public showConfirm(): void {
    this.messageService.clear();
    this.messageService.add({ key: 'c', sticky: true, severity: 'warn', summary: 'Are you sure?', detail: 'Confirm to Delete' });
  }

  public onConfirm(): void {
    this.accountService.deleteAccount(this.selections[0].id).subscribe(response => {
      this.accounts = response.accounts
      this.messageService.clear('c');
      this.editMode = null;
    }
    );
  }

  public onReject(): void {
    this.messageService.clear('c');
  }
}
