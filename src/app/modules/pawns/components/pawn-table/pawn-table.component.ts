import { Component, OnInit, Input, Output, EventEmitter, ViewChild} from "@angular/core";
import { Pawn } from "../../../../models/pawn.model";
import { AEMode } from "../../../../models/crud.enum";
import { Subject } from "rxjs";

@Component({
  selector: "pa-pawn-search-table",
  templateUrl:"../../../../core/page-components/search-table/search-table.component.html",
  styleUrls: ["../../../../core/page-components/search-table/search-table.component.scss"
  ]
})
export class PawnTableComponent implements OnInit {
  @Input()
  public rows: Pawn[];
  @Output()
  public selections = new EventEmitter<Pawn>();
  @Output()
  public editMode = new EventEmitter<AEMode>();
  @Output()
  public onClear = new EventEmitter<AEMode>();
  @Output()
  public pageVar = new EventEmitter<any>();
  @Input()
  public totalRecords: number;
  @Input()
  public cols: any[];

  public rowIndex: any;
  public selectedRows: any = [];

  @ViewChild("searchTable") searchTable: any;

  constructor() {
  }

  ngOnInit() {
    this.rowIndex = "pawnTicketNumber";

    this.cols = [
      { field: "pawnTicketNumber", header: "Pawn Number" },
      { field: "fullname", header: "Fullname" },
      { field: "itemName", header: "Item Name" },
      { field: "pawnDateGranted", header: "Pawn Date" },
      { field: "created", header: "Created" }
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
