import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pa-redemptions',
  templateUrl: './redemptions.component.html',
  styleUrls: [ './redemptions.component.css' ]
})

export class RedemptionsComponent implements OnInit {
  constructor() { }

  public cols: any[];
  public accounts: any[];
  ngOnInit() {
    this.cols = [
      { field: "account_id", header: "ID" },
      { field: "fullname", header: "Name" },
      { field: "contact_number", header: "Phone" },
      { field: "address", header: "Address" }
    ];

    this.accounts = [
      {
        account_id: "ACT-000000001",
        fullname: "John Abbott",
        contact_number: "0933 9690 655",
        address: "Grand Residences Mabolo Cebu City"
      },
      {
        account_id: "ACT-000000002",
        fullname: "John Abbott",
        contact_number: "0933 9690 655",
        address: "Grand Residences Mabolo Cebu City"
      },
      {
        account_id: "ACT-000000003",
        fullname: "John Abbott",
        contact_number: "0933 9690 655",
        address: "Grand Residences Mabolo Cebu City"
      },
      {
        account_id: "ACT-000000002",
        fullname: "John Abbott",
        contact_number: "0933 9690 655",
        address: "Grand Residences Mabolo Cebu City"
      }
    ];
  }
}