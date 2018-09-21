import { Component, OnInit } from '@angular/core';

export abstract class GenericTablePageComponent implements OnInit {
  constructor() { }

  ngOnInit() { }

  public onRowClick(event: any): void {
    console.log('onRowClick');
  }
}