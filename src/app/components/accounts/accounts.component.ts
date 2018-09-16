import { Component, OnInit } from "@angular/core";

@Component({
  selector: "pa-account",
  templateUrl: "./accounts.component.html",
  styleUrls: ["./accounts.component.scss"]
})
export class AccountsComponent implements OnInit {
  public cols: any[];
  public accounts: any[];
  public selectedAccount: any;

  constructor() {}

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
        account_id: "ACT-000000004",
        fullname: "John Abbott",
        contact_number: "0933 9690 655",
        address: "Grand Residences Mabolo Cebu City"
      },
      {
        account_id: "ACT-000000005",
        fullname: "John Abbott",
        contact_number: "0933 9690 655",
        address: "Grand Residences Mabolo Cebu City"
      }
    ];
  }
}
