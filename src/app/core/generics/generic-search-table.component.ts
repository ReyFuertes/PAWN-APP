import { Input } from "@angular/core";

export abstract class GenericSearchTableComponent {

  @Input()
  protected cols: any[];
  @Input()
  protected rows: any[];

  protected rowIndex: any;
  
  protected selectedRow: any;

  protected onRowSelect(event: any): void {
    console.log('onRowSelect', event);
  }

}