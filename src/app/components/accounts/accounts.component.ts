import { Component, OnInit } from "@angular/core";
import { GenericTablePageComponent } from "../../shared/generic-table-page.component";

@Component({
  selector: "pa-account",
  templateUrl: "./accounts.component.html",
  styleUrls: ["./accounts.component.scss"]
})
export class AccountsComponent extends GenericTablePageComponent implements OnInit {
  public cols: any[];
  public accounts: any[];
  public selectedAccount: any;

  constructor() {
    super();
  }

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
      },
      {
        account_id: "ACT-000000013",
        fullname: "John Abbott",
        contact_number: "0933 9690 655",
        address: "Grand Residences Mabolo Cebu City"
      },
      {
        account_id: "ACT-000000014",
        fullname: "John Abbott",
        contact_number: "0933 9690 655",
        address: "Grand Residences Mabolo Cebu City"
      },
      {
        account_id: "ACT-000000015",
        fullname: "John Abbott",
        contact_number: "0933 9690 655",
        address: "Grand Residences Mabolo Cebu City"
      },
      {
        account_id: "ACT-000000016",
        fullname: "John Abbott",
        contact_number: "0933 9690 655",
        address: "Grand Residences Mabolo Cebu City"
      },
      {
        account_id: "ACT-000000017",
        fullname: "John Abbott",
        contact_number: "0933 9690 655",
        address: "Grand Residences Mabolo Cebu City"
      }
    ];
  
  }

  public clickStopper(event: any) {
    event.stopPropagation();
    console.log('clickStopper');
    return;
  }
}
