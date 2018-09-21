import { Component, OnInit } from "@angular/core";

@Component({
  selector: "pa-loans",
  templateUrl: "loans.component.html",
  styleUrls: ["loans.component.css"]
})
export class LoansComponent implements OnInit {
  constructor() {}

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
      }
    ];
  }
}
