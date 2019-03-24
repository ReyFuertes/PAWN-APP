import { Component, OnInit, ViewChild } from "@angular/core";
import { PageVar } from "../../../../models/pages.model";
import { Item } from "../../../../models/item.model";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { MessageService } from "primeng/api";
import { Subject } from "rxjs";
import { AEMode } from "../../../../models/crud.enum";
import { AccountService } from "../../../accounts/account.service";
import { ItemService } from "../../../items/item.service";
import { ItemTableComponent } from "../item-table/item.table.component";
import { PrintEntity } from "../../../../models/print-entity.model";
import { ItemDetailComponent } from "../item-detail/item-detail.component";

@Component({
  selector: 'pa-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  public showModal: boolean = false;
  public items: Item[];
  public selections: Item[];
  public editMode: AEMode;
  public totalRecords: number;
  public aeMode: AEMode;
  public searchTerm$ = new Subject<string>();
  public printEntity = PrintEntity.Item;
  public selectedItem: Item;
  public contentStyle: any = {'width': '950px', 'overflow-x': 'hidden'};

  @ViewChild("itemTable") itemTable: ItemTableComponent;
  @ViewChild(ItemDetailComponent) itemDetailComponent: ItemDetailComponent;

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private accountService: AccountService,
    private itemService: ItemService
  ) {

    this.itemService.searchItem(this.searchTerm$).subscribe(results => (this.items = results.items));
  }

  public load(pageVar: PageVar): void {
    this.itemService.getItems(pageVar).subscribe(response => {
      this.items = response.items;
      this.totalRecords = response.totalCount;
      console.log("%cItems loaded..", "background:blue;color:#fff");
    });
  }

  ngOnInit() {
    this.load({ limit: 10, offset: 0 });
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
    this.itemTable.onRowUnselect();
  }

  public onItemSaveUpdate(): void {
    this.showModal = false;
    this.itemDetailComponent.onSubmit();
  }

  public onClose(): void {
    this.showModal = !this.showModal;

    if (!this.showModal) {
      this.load({ limit: 10, offset: 0 });
    }

    this.itemTable.onRowUnselect();
  }

  public onAdd(): void {
    this.showModal = !this.showModal;
    this.aeMode = AEMode.add;
  }

  public onEdit(): void {
    if (this.selections[0].id) {
      this.showModal = !this.showModal;
      this.aeMode = AEMode.edit;
      this.itemService.editItem(this.selections[0].id).subscribe(item => {
        this.selectedItem = item;
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
    this.itemService.deleteItem(this.selections[0].id).subscribe(response => {
      this.items = response.items;
      this.messageService.clear("c");
      this.editMode = null;
    });
  }

  public onReject(): void {
    this.messageService.clear("c");
  }
}
