import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Item } from '../../../../models/item.model';
import { ItemService } from '../../item.service';
import { Router } from '@angular/router';
import { PrintParams } from '../../../../models/print.model';

@Component({
  selector: 'pa-item-print-table',
  templateUrl: './item-print-table.component.html',
  styleUrls: ['./item-print-table.component.scss']
})
export class ItemPrintTableComponent implements OnInit, AfterViewInit {
  @Input()
  public printParams: PrintParams;

  public items: Item[];

  constructor(private router: Router, private itemService: ItemService) { }

  ngOnInit(): void { 
    this.loadItem();
  }

  ngAfterViewInit(): void {
    
  }

  public loadItem(): void {
    this.itemService.printItems(this.printParams).subscribe(response => {
      this.items = response.items;

      if(this.items && this.items.length > 0) {
        setTimeout(() => {
          this.print();
        }, 1000);
      }
    });
  }

  public print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;

    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <style>
            body {
              font-family: "Roboto", sans-serif;
              color:#444;
            }
            table {
              width:100%;
              border-collapse: collapse;
            }
            table tr td:first-child {
              text-align: center;
            }
            table tr td:nth-child(2) {
              width:100px;
              text-align: center;
            }
            table tr td:nth-child(3) {
              width:60px;
              text-align: center;
            }
            table tr td:nth-child(4) {
              text-align: center;
            }
            table tr td, table tr th {
              padding:5px;
              font-family: "Roboto", sans-serif;
              font-size:12px;
              border: thin #CCC solid;
            }
            table tr th {
              background:#CCC;
              background-color:#CCC;
            }
            .doNotPrint {
              display:none;
            }
          </style>
        </head>
        <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }

  public onBack(): void {
    this.router.navigateByUrl('dashboard/items');
  }

  private maxNum(): number {
    return Math.floor(Math.random() * 150);
  }
}
