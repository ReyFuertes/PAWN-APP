import { Component, OnInit, ViewChild } from "@angular/core";
import { AccountService } from "../../account.service";
import { PageVar } from "../../../../models/pages.model";
import { Account } from "../../../../models/account.model";
import { FormGroup, Validators, FormBuilder, NgForm } from "@angular/forms";
import {MessageService} from 'primeng/api';
import { Subject } from "rxjs";
import { AEMode } from "../../../../models/crud.enum";
import { AccountTableComponent } from "../account-table/account-table.component";

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
  public form: FormGroup;
  public searchTerm$ = new Subject<string>();

  @ViewChild("accountTable") accountTable: AccountTableComponent;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private messageService: MessageService
  ) {
    this.form = this.formBuilder.group({
      idNumber: ["", Validators.compose([Validators.required])],
      firstName: ["", Validators.compose([Validators.required])],
      lastName: ["", Validators.compose([Validators.required])],
      phoneNumber: ["", Validators.compose([Validators.required])],
      birthDate: ["", Validators.compose([Validators.required])],
      validId: ["", Validators.compose([Validators.required])],
      validIdNumber: ["", Validators.compose([Validators.required])],
      address: ["", Validators.compose([Validators.required])]
    });

    this.accountService.searchAccount(this.searchTerm$).subscribe(results => this.accounts = results.accounts);
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

  public onClose(event: boolean): void {
    this.showModal = event;

    if (!this.showModal) {
      this.load({ limit: 10, offset: 0 });
    }
    this.accountTable.onRowUnselect();
  }

  public onAdd(): void {
    this.showModal = !this.showModal;
    this.aeMode = AEMode.add;
  }

  public onEdit(): void {
    if (this.selections[0].id) {
      this.showModal = !this.showModal;
      this.aeMode = AEMode.edit;
      this.accountService
        .editAccount(this.selections[0].id)
        .subscribe(response =>
          this.form.patchValue(<FormGroup>response.accounts[0])
        );
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
    this.messageService.add({key: 'c', sticky: true, severity:'warn', summary:'Are you sure?', detail:'Confirm to Delete'});
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
