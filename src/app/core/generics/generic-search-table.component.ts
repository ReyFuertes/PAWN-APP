import { Input } from "@angular/core";

export abstract class GenericSearchTableComponent {

  @Input()
  protected cols: any[];
  @Input()
  protected rows: any[];

  protected rowIndex: any;
  protected selectedRows: any = [];

  protected onRowSelect(event: any): void {
    this.selectedRows = event.data;
  }

  protected onRowUnselect(event: any): void {}
  

}