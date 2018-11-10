import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { RedemptionService } from '../../redemption.service';
import { Router } from '@angular/router';
import { PrintParams } from '../../../../models/print.model';
import { Redemption } from '../../../../models/redemption.mode';

@Component({
  selector: 'pa-redemption-print-table',
  templateUrl: './redemption-print-table.component.html',
  styleUrls: ['./redemption-print-table.component.scss']
})
export class RedemptionPrintTableComponent implements OnInit, AfterViewInit {
  @Input()
  public printParams: PrintParams;

  public redemptions: Redemption[];

  constructor(private router: Router, private redemptionService: RedemptionService) { }

  ngOnInit(): void { 
    this.loadRedemption();
  }

  ngAfterViewInit(): void {
    
  }

  public loadRedemption(): void {
    this.redemptionService.printRedemptions(this.printParams).subscribe(response => {
      this.redemptions = response.redemptions;

      if(this.redemptions && this.redemptions.length > 0) {
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
            table tr td:first-child {
              text-align: center;
            }
            table tr td:nth-child(2) {
              width:120px;
            }
            table tr td:nth-child(3) {
              width:120px;
            }
            table tr td:nth-child(4) {
              width:120px;
            }
            table {
              width:100%;
              border-collapse: collapse;
            }
            table tr td, table tr th {
              padding:5px;
              font-family: "Roboto", sans-serif;
              font-size:12px;
              border: thin #CCC solid;
              collap
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
    this.router.navigateByUrl('dashboard/redemptions');
  }

  private maxNum(): number {
    return Math.floor(Math.random() * 150);
  }
}
