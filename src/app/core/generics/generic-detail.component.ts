import { Component, OnInit } from "@angular/core";

export abstract class GenericDetailComponent {
  public save(): void {
    console.log("save");
  }

  public cancel(): void {
    console.log("cancel");
  }
}
