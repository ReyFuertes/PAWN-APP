import { Component, OnInit, Input, Output, EventEmitter, ViewChild} from "@angular/core";
import { AEMode } from "../../../../models/crud.enum";
import { Item } from "../../../../models/item.model";

@Component({
  selector: "pa-item-search-table",
  templateUrl:"../../../../core/page-components/search-table/search-table.component.html",
  styleUrls: ["../../../../core/page-components/search-table/search-table.component.scss"
  ]
})
export class ItemTableComponent implements OnInit {
  @Input()
  public rows: Item[];
  @Output()
  public selections = new EventEmitter<Item>();
  @Output()
  public editMode = new EventEmitter<AEMode>();
  @Output()
  public onClear = new EventEmitter<AEMode>();
  @Output()
  public pageVar = new EventEmitter<any>();
  @Input()
  public totalRecords: number;
  @Input() public cols: any[];

  public rowIndex: any;
  public selectedRows: any = [];

  @ViewChild("searchTable") searchTable: any;

  constructor() {
  }

  ngOnInit() {
    this.rowIndex = "sku";

    this.cols = [
      { field: "sku", header: "ID" },
      { field: "itemName", header: "Item Name" },
      { field: "itemType", header: "Item Type" },
      { field: "grams", header: "Grams" },
      { field: "karat", header: "Karat" },
      { field: "description", header: "description" }
    ];
  }

  public onRowSelect(event: any): void {
    this.selections.emit(this.searchTable.selection);
    this.editMode.emit(this.actionMode());
  }

  public onRowUnselect(): void {
    this.selections.emit(this.searchTable.selection);
    this.editMode.emit(this.actionMode());
    this.selectedRows = [];
  }

  private actionMode(): AEMode {
    return this.searchTable.selection.length === 1 ? AEMode.edit : AEMode.add;
  }
}
