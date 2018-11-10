import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Account } from '../../../../models/account.model';
import { AccountService } from '../../account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pa-account-print-table',
  templateUrl: './account-print-table.component.html',
  styleUrls: ['./account-print-table.component.scss']
})
export class AccountPrintTableComponent implements OnInit, AfterViewInit {
  @Input()
  public accounts: Account[];

  constructor(private router: Router, private accountService: AccountService) { }

  ngOnInit(): void { 
    this.loadAccount();
  }

  ngAfterViewInit(): void {
    
  }

  public loadAccount(): void {
    this.accountService.getAccounts({ limit: this.maxNum(), offset: 0 }).subscribe(response => {
      this.accounts = response.accounts;

      setTimeout(() => {
        this.print();
      }, 1000);
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
    this.router.navigateByUrl('dashboard/accounts');
  }

  private maxNum(): number {
    return Math.floor(Math.random() * 150);
  }
}
