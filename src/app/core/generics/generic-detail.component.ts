import { Component, OnInit } from "@angular/core";

export abstract class GenericDetailComponent {
  constructor() {

  }
 
  public genUuid(prefix: string): string {
    return `${prefix}-${Math.random().toString(36).toUpperCase().substr(2, 10)}`;
  }
}
