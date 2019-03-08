import { Component, OnInit, ViewChild } from "@angular/core";
import { PageVar } from "../../../../models/pages.model";
import { Pawn } from "../../../../models/pawn.model";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { MessageService } from "primeng/api";
import { Subject } from "rxjs";
import { PawnService } from "../../pawn.service";
import { AEMode } from "../../../../models/crud.enum";
import { AccountService } from "../../../accounts/account.service";
import { Option } from "../../../../models/option.model";
import { ItemService } from "../../../items/item.service";
import { PawnTableComponent } from "../pawn-table/pawn-table.component";
import { PrintEntity } from "../../../../models/print-entity.model";
import { Router } from "@angular/router";

@Component({
  selector: "pa-pawn-list",
  templateUrl: "./pawn-list.component.html",
  styleUrls: ["./pawn-list.component.scss"]
})
export class PawnListComponent implements OnInit {
  public showModal: boolean = false;
  public pawns: Pawn[];
  public selections: Pawn[];
  public editMode: AEMode;
  public totalRecords: number;
  public aeMode: AEMode;
  public form: FormGroup;
  public searchTerm$ = new Subject<string>();
  public accounts: Option[] = [];
  public items: Option[] = [];
  public printEntity = PrintEntity.Pawn;

  @ViewChild("pawnTable") pawnTable: PawnTableComponent;

  constructor(
    private formBuilder: FormBuilder,
    private pawnService: PawnService,
    private messageService: MessageService,
    private accountService: AccountService,
    private itemService: ItemService,
    private router: Router
  ) {
    this.accounts = [{ value: null, label: "Select an Account" }];
    this.items = [{ value: null, label: "Select an Item" }];

    this.form = this.formBuilder.group({
      id: [""],
      pawnTicketNumber: ["", Validators.compose([Validators.required])],
      pawnDateGranted: ["", Validators.compose([Validators.required])],
      pawnMaturityDate: ["", Validators.compose([Validators.required])],
      pawnExpiryDate: ["", Validators.compose([Validators.required])], 
      auctionDate: ["", Validators.compose([Validators.required])], 
      pawnInterest: ["", Validators.compose([Validators.required])],
      pawnAmount: ["", Validators.compose([Validators.required])],
      pawnTotalAmount: ["", Validators.compose([Validators.required])],
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
        itemName: [""],
        itemType: [""],
        karat: [""],
        grams: [""],
        description: [""]
      }),
      image: [""]
    });
    this.pawnService.searchPawn(this.searchTerm$).subscribe(results => this.pawns = results.pawns);
  }

  public load(pageVar: PageVar): void {
    this.pawnService.getPawns(pageVar).subscribe(response => {
      this.pawns = response.pawns;
      this.totalRecords = response.totalCount;
      console.log("%cPawns loaded..", "background:orange;color:#fff");
    });
  }

  ngOnInit() {
    this.load({ limit: 10, offset: 0 });
    this.loadAccounts();
    this.loadItems();
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
    this.pawnTable.onRowUnselect();
  }

  public onClose(): void {
    this.showModal = !this.showModal;

    if (!this.showModal) {
      this.load({ limit: 10, offset: 0 });
    }

    this.pawnTable.onRowUnselect();
  }

  public onAdd(): void {
    this.aeMode = AEMode.add;
    this.showModal = !this.showModal;
    
    //this.router.navigateByUrl('dashboard/pawn/add');
  }

  public onEdit(): void {
    if (this.selections[0].id) {
      this.showModal = !this.showModal;
      this.aeMode = AEMode.edit;
      this.pawnService.editPawn(this.selections[0].id).subscribe(response => {
        this.form.patchValue(<FormGroup>response.pawn);
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
    this.messageService.add({
      key: "c",
      sticky: true,
      severity: "warn",
      summary: "Are you sure?",
      detail: "Confirm to Delete"
    });
  }

  public onConfirm(): void {
    this.pawnService.deletePawn(this.selections[0].id).subscribe(response => {
      this.pawns = response.pawns;
      this.messageService.clear("c");
      this.editMode = null;
    });
  }

  public onReject(): void {
    this.messageService.clear("c");
  }
}
