import { Input } from "@angular/core";
import { LazyLoadEvent } from "primeng/api";
export abstract class GenericSearchTableComponent {

  @Input()
  protected cols: any[];
  @Input()
  protected rows: any[];

  protected rowIndex: any;
  protected selectedRows: any = [];
  public loading: boolean = false;

  protected onRowSelect(event: any): void {
    this.selectedRows = event.data;
  }

  protected onRowUnselect(event: any): void {
    this.selectedRows = [];
  }
  
  public loadData(event: LazyLoadEvent) {
    debugger
    this.loading = true;

    setTimeout(() => {
        if (this.rows) {
            this.loading = false;
        }
    }, 1000);
  }
}