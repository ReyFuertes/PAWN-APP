import { Component, OnInit } from "@angular/core";

@Component({
  selector: "pa-items",
  templateUrl: "./items.component.html",
  styleUrls: ["./items.component.scss"]
})
export class ItemsComponent implements OnInit {
  public cols: any[];
  
  constructor() {}

  ngOnInit() {
    this.cols = [
      { field: "vin", header: "Vin" },
      { field: "year", header: "Year" },
      { field: "brand", header: "Brand" },
      { field: "color", header: "Color" }
    ];
  }
}
