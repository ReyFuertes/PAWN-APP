import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

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