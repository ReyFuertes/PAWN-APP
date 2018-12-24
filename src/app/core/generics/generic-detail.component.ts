import { Component, OnInit } from "@angular/core";

export abstract class GenericDetailComponent {
  constructor() {

  }

  private getBranch(): string {
    return JSON.parse(localStorage.getItem('u')).branch;
  }
 
  protected genUuid(prefix: string): string {
    return `${this.getBranch()}-${prefix}-${Math.random().toString(36).toUpperCase().substr(2, 10)}`;
  }
}
