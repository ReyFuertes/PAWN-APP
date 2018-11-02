import { Component, OnInit, ViewChild } from "@angular/core";
import { PageVar } from "../../../../models/pages.model";
import { Renewal } from "../../../../models/renewal.model";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { MessageService } from "primeng/api";
import { Subject } from "rxjs";
import { AEMode } from "../../../../models/crud.enum";
import { RenewalService } from "../../../renewals/renewal.service";
import { RenewalTableComponent } from "../renewal-table/renewal-table.component";
import { AccountService } from "../../../accounts/account.service";
import { Option } from "../../../../models/option.model";
import { ItemService } from "../../../items/item.service";
import { PawnService } from "../../../pawns/pawn.service";

@Component({
  selector: 'pa-renewal-list',
  templateUrl: './renewal-list.component.html',
  styleUrls: ['./renewal-list.component.scss']
})
export class RenewalListComponent implements OnInit {
  public showModal: boolean = false;
  public renewals: Renewal[];
  public selections: Renewal[];
  public editMode: AEMode;
  public totalRecords: number;
  public aeMode: AEMode;
  public form: FormGroup;
  public searchTerm$ = new Subject<string>();
  public accounts: Option[] = [];
  public items: Option[] = [];
  public pawns: Option[] = [];

  @ViewChild("renewalTable") renewalTable: RenewalTableComponent;

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private renewalService: RenewalService,
    private accountService: AccountService,
    private itemService: ItemService,
    private pawnService: PawnService
  ) {
    this.accounts = [{ value: null, label: "Select an Account" }];
    this.items = [{ value: null, label: "Select an Item" }];
    this.pawns = [{ value: null, label: "Select Pawn Number" }];

    this.form = this.formBuilder.group({
      id: [""],
      renewalDate: ["", Validators.compose([Validators.required])],
      renewalPawnTicket: ["", Validators.compose([Validators.required])],
      renewalAmount: ["", Validators.compose([Validators.required])],
      renewalTotalAmount: ["", Validators.compose([Validators.required])],
      interest: ["", Validators.compose([Validators.required])],
      difference: ["", Validators.compose([Validators.required])],
      remarks: ["", Validators.compose([Validators.required])],
      pawnId: ["", Validators.compose([Validators.required])],
      account: this.formBuilder.group({
        id: ["", Validators.compose([Validators.required])],
        birthDate: [""],
        firstName: [""],
        lastName: [""],
        contactNumber: [""],
        address: [""]
      }),
      item: this.formBuilder.group({
        id: ["", Validators.compose([Validators.required])],
        sku: [""],
        itemName: [""],
        itemType: [""],
        karat: [""],
        grams: [""],
        description: [""]
      })
    });

    this.renewalService.searchRenewal(this.searchTerm$).subscribe(results => (this.renewals = results.renewals));
  }

  public loadAccounts(): void {
    this.accountService.getAccounts({ limit: this.maxNum(), offset: 0 }).subscribe(response => {
        response.accounts.forEach(account => {
          const option = {
            value: account.id,
            label: account.fullname
          };
          this.accounts.push(option);
        });
      });
  }

  public loadPawns(): void {
    this.pawnService.getPawns({ limit: this.maxNum(), offset: 0 }).subscribe(response => {
      response.pawns.forEach(item => {
        const option = {
          value: item.id,
          label: item.pawnTicketNumber
        };
        this.pawns.push(option);
      });
    });
  }

  public loadItems(): void {
    this.itemService.getItems({ limit: this.maxNum(), offset: 0 }).subscribe(response => {
      response.items.forEach(item => {
        const option = {
          value: item.id,
          label: item.itemName
        };
        this.items.push(option);
      });
    });
  }

  public load(pageVar: PageVar): void {
    this.renewalService.getRenewals(pageVar).subscribe(response => {
      this.renewals = response.renewals;
      this.totalRecords = response.totalCount;
      console.log("%cRenewals loaded..", "background:gray;color:#fff");
    });
  }

  ngOnInit() {
    this.load({ limit: 10, offset: 0 });
    this.loadAccounts();
    this.loadItems();
    this.loadPawns();
  }

  /**
   * Temporary number limit
   */
  private maxNum(): number {
    return Math.floor(Math.random() * 50);
  }

  public onSearch(event: any): void {
    this.searchTerm$.next(event.target.value);
  }

  public onRefresh(): void {
    this.load({ limit: 10, offset: 0 });
    this.renewalTable.onRowUnselect();
  }

  public onClose(event: boolean): void {
    this.showModal = event;

    if (!this.showModal) {
      this.load({ limit: 10, offset: 0 });
    }
    this.renewalTable.onRowUnselect();
  }

  public onAdd(): void {
    this.showModal = !this.showModal;
    this.aeMode = AEMode.add;
  }

  public onEdit(): void {
    if (this.selections[0].id) {
      this.showModal = !this.showModal;
      this.aeMode = AEMode.edit;
      this.renewalService.editRenewal(this.selections[0].id).subscribe(response => this.form.patchValue(<FormGroup>response.renewal));
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
    this.messageService.add({
      key: "c",
      sticky: true,
      severity: "warn",
      summary: "Are you sure?",
      detail: "Confirm to Delete"
    });
  }

  public onConfirm(): void {
    this.renewalService.deleteRenewal(this.selections[0].id).subscribe(response => {
      this.renewals = response.renewals;
      this.messageService.clear("c");
      this.editMode = null;
    });
  }

  public onReject(): void {
    this.messageService.clear("c");
  }
}
