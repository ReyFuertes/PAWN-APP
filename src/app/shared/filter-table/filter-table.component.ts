import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pa-filter-table',
  templateUrl: './filter-table.component.html',
  styleUrls: [ './filter-table.component.scss' ]
})

export class FilterTableComponent implements OnInit {

  @Output()
  public onSearch = new EventEmitter<string>();
  constructor() { }

  ngOnInit() { }
}