import { Component, OnInit } from "@angular/core";

@Component({
  selector: "pa-items",
  templateUrl: "./items.component.html",
  styleUrls: ["./items.component.scss"]
})
export class ItemsComponent implements OnInit {
  public cols: any[];
  public accounts: any[];
  
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
      },
      {
        account_id: "ACT-000000006",
        fullname: "John Abbott",
        contact_number: "0933 9690 655",
        address: "Grand Residences Mabolo Cebu City"
      },
      {
        account_id: "ACT-000000007",
        fullname: "John Abbott",
        contact_number: "0933 9690 655",
        address: "Grand Residences Mabolo Cebu City"
      },
      {
        account_id: "ACT-000000008",
        fullname: "John Abbott",
        contact_number: "0933 9690 655",
        address: "Grand Residences Mabolo Cebu City"
      },
      {
        account_id: "ACT-000000009",
        fullname: "John Abbott",
        contact_number: "0933 9690 655",
        address: "Grand Residences Mabolo Cebu City"
      },
      {
        account_id: "ACT-000000010",
        fullname: "John Abbott",
        contact_number: "0933 9690 655",
        address: "Grand Residences Mabolo Cebu City"
      },
      {
        account_id: "ACT-000000011",
        fullname: "John Abbott",
        contact_number: "0933 9690 655",
        address: "Grand Residences Mabolo Cebu City"
      },
      {
        account_id: "ACT-000000012",
        fullname: "John Abbott",
        contact_number: "0933 9690 655",
        address: "Grand Residences Mabolo Cebu City"
      }
    ];
  
  }
}
