import { Component, OnInit, Input, Output, EventEmitter, ViewChild} from "@angular/core";
import { GenericSearchTableComponent } from "../../../../core/generics/generic-search-table.component";
import { Pawn } from "../../../../models/pawn.model";
import { AEMode } from "../../../../models/crud.enum";

@Component({
  selector: "pa-pawn-search-table",
  templateUrl:"../../../../core/page-components/search-table/search-table.component.html",
  styleUrls: ["../../../../core/page-components/search-table/search-table.component.scss"
  ]
})
export class PawnTableComponent extends GenericSearchTableComponent implements OnInit {
  @Input()
  public rows: Pawn[];
  @Output()
  public selections = new EventEmitter<Pawn>();
  @Output()
  public editMode = new EventEmitter<AEMode>();
  @Output()
  public pageVar = new EventEmitter<any>();
  @Input()
  public totalRecords: number;

  @ViewChild("searchTable")
  searchTable: any;

  constructor() {
    super();
  }

  ngOnInit() {
    this.rowIndex = "pawn_ticket_number";

    this.cols = [
      { field: "pawnTicketNumber", header: "Pawn Number" },
      { field: "pawnDateGranted", header: "Pawn Date" },
      { field: "itemName", header: "Item Name" },
      { field: "fullname", header: "Fullname" },
      { field: "created", header: "Created" }
    ];
  }

  public onRowSelect(event: any): void {
    super.onRowSelect(event);

    this.selections.emit(this.searchTable.selection);
    this.editMode.emit(this.actionMode());
  }

  public onRowUnselect(event: any): void {
    super.onRowSelect(event);

    this.selections.emit(this.searchTable.selection);
    this.editMode.emit(this.actionMode());
  }

  private actionMode(): AEMode {
    return this.searchTable.selection.length === 1 ? AEMode.edit : AEMode.add;
  }
}
