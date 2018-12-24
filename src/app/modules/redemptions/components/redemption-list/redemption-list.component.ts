import { Component, OnInit, ViewChild } from "@angular/core";
import { PageVar } from "../../../../models/pages.model";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { MessageService } from "primeng/api";
import { Subject } from "rxjs";
import { AEMode } from "../../../../models/crud.enum";
import { RedemptionService } from "../../../redemptions/redemption.service";
import { RedemptionTableComponent } from "../redemption-table/redemption-table.component";
import { AccountService } from "../../../accounts/account.service";
import { Option } from "../../../../models/option.model";
import { ItemService } from "../../../items/item.service";
import { PawnService } from "../../../pawns/pawn.service";
import { Redemption } from "../../../../models/redemption.mode";
import { PrintEntity } from "../../../../models/print-entity.model";

@Component({
  selector: 'pa-redemption-list',
  templateUrl: './redemption-list.component.html',
  styleUrls: ['./redemption-list.component.scss']
})
export class RedemptionListComponent implements OnInit {
  public showModal: boolean = false;
  public redemptions: Redemption[];
  public selections: Redemption[];
  public editMode: AEMode;
  public totalRecords: number;
  public aeMode: AEMode;
  public form: FormGroup;
  public searchTerm$ = new Subject<string>();
  public accounts: Option[] = [];
  public items: Option[] = [];
  public pawns: Option[] = [];
  public printEntity = PrintEntity.Redemption;

  @ViewChild("redemptionTable") redemptionTable: RedemptionTableComponent;

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private redemptionService: RedemptionService,
    private accountService: AccountService,
    private itemService: ItemService,
    private pawnService: PawnService
  ) {
    this.accounts = [{ value: null, label: "Select an Account" }];
    this.items = [{ value: null, label: "Select an Item" }];
    this.pawns = [{ value: null, label: "Select Pawn Number" }];

    this.form = this.formBuilder.group({
      id: [""],
      redemptionDate: ["", Validators.compose([Validators.required])],
      redemptionPawnTicket: ["", Validators.compose([Validators.required])],
      redemptionAmount: ["", Validators.compose([Validators.required])],
      redemptionTotalAmount: ["", Validators.compose([Validators.required])],
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

    this.redemptionService.searchRedemption(this.searchTerm$).subscribe(results => (this.redemptions = results.redemptions));
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
    this.redemptionService.getRedemptions(pageVar).subscribe(response => {
      this.redemptions = response.redemptions;
      this.totalRecords = response.totalCount;
      console.log("%cRedemptions loaded..", "background:gray;color:#fff");
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
    this.redemptionTable.onRowUnselect();
  }

  public onClose(): void {
    this.showModal = !this.showModal;

    if (!this.showModal) {
      this.load({ limit: 10, offset: 0 });
    }
    this.redemptionTable.onRowUnselect();
  }

  public onAdd(): void {
    this.showModal = !this.showModal;
    this.aeMode = AEMode.add;
  }

  public onEdit(): void {
    if (this.selections[0].id) {
      this.showModal = !this.showModal;
      this.aeMode = AEMode.edit;
      this.redemptionService.editRedemption(this.selections[0].id).subscribe(response => this.form.patchValue(<FormGroup>response.redemption));
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
    this.redemptionService.deleteRedemption(this.selections[0].id).subscribe(response => {
      this.redemptions = response.redemptions;
      this.messageService.clear("c");
      this.editMode = null;
    });
  }

  public onReject(): void {
    this.messageService.clear("c");
  }
}
