import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Pawn } from '../../../../models/pawn.model';
import { PawnService } from '../../pawn.service';
import { Router } from '@angular/router';
import { PrintParams } from '../../../../models/print.model';

@Component({
  selector: 'pa-pawn-print-table',
  templateUrl: './pawn-print-table.component.html',
  styleUrls: ['./pawn-print-table.component.scss']
})
export class PawnPrintTableComponent implements OnInit, AfterViewInit {
  @Input()
  public printParams: PrintParams;

  public pawns: Pawn[];

  constructor(private router: Router, private pawnService: PawnService) { }

  ngOnInit(): void { 
    this.loadPawn();
  }

  ngAfterViewInit(): void {
    
  }

  public loadPawn(): void {
    this.pawnService.printPawns(this.printParams).subscribe(response => {
      this.pawns = response.pawns;

      if(this.pawns && this.pawns.length > 0) {
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
    this.router.navigateByUrl('dashboard/pawns');
  }

  private maxNum(): number {
    return Math.floor(Math.random() * 150);
  }
}
