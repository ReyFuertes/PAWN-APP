import { Component, OnInit, ViewChild } from "@angular/core";
import { AccountService } from "../../account.service";
import { PageVar } from "../../../../models/pages.model";
import { Account, AEMode } from "../../../../models/account.model";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";

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

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService
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

  public onClose(event: boolean): void {
    this.showModal = event;

    if (!this.showModal) {
      this.load({ limit: 10, offset: 0 });
    }
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
    this.accountService
        .deleteAccount(this.selections[0].id)
        .subscribe(response =>
          this.accounts = response.accounts
        );
  }

  public paginate(event: any): void {
    this.load({ limit: event.rows, offset: event.first });
  }
}
