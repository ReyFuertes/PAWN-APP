import { Component, OnInit } from '@angular/core';
import { GenericSearchTableComponent } from '../../core/generics/generic-search-table.component';

@Component({
  selector: 'pa-account-search-table',
  templateUrl: '../../core/page-components/search-table/search-table.component.html',
  styleUrls: ['../../core/page-components/search-table/search-table.component.scss']
})

export class AccountSearchTableComponent extends GenericSearchTableComponent implements OnInit {
  constructor() {
    super();
   }

  ngOnInit() { 
    this.rowIndex = 'account_id';

    this.cols = [
      { field: 'account_id', header: 'ID', width: '170px' },
      { field: 'fullname', header: 'Name', width: '270px' },
      { field: 'contact_number', header: 'Phone', width: '270px' },
      { field: 'address', header: 'Address', width: '100%' }
    ];

    this.rows = [
      {
        account_id: 'ACT-000000001',
        fullname: 'John Abbott',
        contact_number: '0933 9690 655',
        address: 'Grand Residences Mabolo Cebu City'
      },
      {
        account_id: 'ACT-000000002',
        fullname: 'John Abbott',
        contact_number: '0933 9690 655',
        address: 'Grand Residences Mabolo Cebu City'
      },
      {
        account_id: 'ACT-000000003',
        fullname: 'John Abbott',
        contact_number: '0933 9690 655',
        address: 'Grand Residences Mabolo Cebu City'
      },
      {
        account_id: 'ACT-000000004',
        fullname: 'John Abbott',
        contact_number: '0933 9690 655',
        address: 'Grand Residences Mabolo Cebu City'
      },
      {
        account_id: 'ACT-000000005',
        fullname: 'John Abbott',
        contact_number: '0933 9690 655',
        address: 'Grand Residences Mabolo Cebu City'
      },
      {
        account_id: 'ACT-000000006',
        fullname: 'John Abbott',
        contact_number: '0933 9690 655',
        address: 'Grand Residences Mabolo Cebu City'
      },
      {
        account_id: 'ACT-000000007',
        fullname: 'John Abbott',
        contact_number: '0933 9690 655',
        address: 'Grand Residences Mabolo Cebu City'
      },
      {
        account_id: 'ACT-000000008',
        fullname: 'John Abbott',
        contact_number: '0933 9690 655',
        address: 'Grand Residences Mabolo Cebu City'
      },
      {
        account_id: 'ACT-000000009',
        fullname: 'John Abbott',
        contact_number: '0933 9690 655',
        address: 'Grand Residences Mabolo Cebu City'
      },
      {
        account_id: 'ACT-000000010',
        fullname: 'John Abbott',
        contact_number: '0933 9690 655',
        address: 'Grand Residences Mabolo Cebu City'
      },
      {
        account_id: 'ACT-000000011',
        fullname: 'John Abbott',
        contact_number: '0933 9690 655',
        address: 'Grand Residences Mabolo Cebu City'
      },
      {
        account_id: 'ACT-000000012',
        fullname: 'John Abbott',
        contact_number: '0933 9690 655',
        address: 'Grand Residences Mabolo Cebu City'
      },
      {
        account_id: 'ACT-000000013',
        fullname: 'John Abbott',
        contact_number: '0933 9690 655',
        address: 'Grand Residences Mabolo Cebu City'
      }
    ];
  
  }
}