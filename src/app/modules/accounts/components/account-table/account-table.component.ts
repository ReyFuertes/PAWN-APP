import { Component, OnInit, Input, Output, EventEmitter, ViewChild} from "@angular/core";
import { GenericSearchTableComponent } from "../../../../core/generics/generic-search-table.component";
import { Account } from "../../../../models/account.model";
import { AEMode } from "../../../../models/crud.enum";

@Component({
  selector: "pa-account-search-table",
  templateUrl:"../../../../core/page-components/search-table/search-table.component.html",
  styleUrls: ["../../../../core/page-components/search-table/search-table.component.scss"
  ]
})
export class AccountTableComponent extends GenericSearchTableComponent implements OnInit {
  @Input()
  public rows: Account[];
  @Output()
  public selections = new EventEmitter<Account>();
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
    this.rowIndex = "idNumber";

    this.cols = [
      { field: "idNumber", header: "ID Number", width: "50%" },
      { field: "fullname", header: "Full Name" },
      { field: "phoneNumber", header: "Phone Number" },
      { field: "address", header: "Address" }
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
