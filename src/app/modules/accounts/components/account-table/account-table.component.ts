import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ChangeDetectorRef, AfterViewInit} from "@angular/core";
import { Account } from "../../../../models/account.model";
import { AEMode } from "../../../../models/crud.enum";
import { LazyLoadEvent } from "primeng/api";

@Component({
  selector: "pa-account-search-table",
  templateUrl:"../../../../core/page-components/search-table/search-table.component.html",
  styleUrls: ["../../../../core/page-components/search-table/search-table.component.scss"
  ]
})
export class AccountTableComponent implements OnInit, AfterViewInit {
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
  @Input()
  public cols: any[];

  public rowIndex: any;
  public selectedRows: any = [];
  public loading: boolean = true;

  @ViewChild("searchTable") searchTable: any;

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.rowIndex = "idNumber";

    this.cols = [
      { field: "idNumber", header: "ID Number", width: "50%" },
      { field: "fullname", header: "Full Name" },
      { field: "phoneNumber", header: "Phone Number" },
      { field: "address", header: "Address" },
      { field: "created", header: "Created" }
    ];
  }

  ngAfterViewInit(): void {
    if(this.rows) {
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    }

    this.cdRef.detectChanges();
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
