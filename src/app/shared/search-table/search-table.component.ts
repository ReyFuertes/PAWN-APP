import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pa-search-table',
  templateUrl: './search-table.component.html',
  styleUrls: [ './search-table.component.scss' ]
})

export class SearchTableComponent implements OnInit {
  @Input() public cols: any[];
  @Input() public rows: any[];

  constructor() { }

  ngOnInit() { }
}