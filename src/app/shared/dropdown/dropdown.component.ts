import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormGroupName, FormControlName } from "@angular/forms";

@Component({
  selector: "pa-dropdown",
  templateUrl: "./dropdown.component.html",
  styleUrls: ["./dropdown.component.scss"]
})
export class DropdownSelectComponent implements OnInit {
  @Input()
  public isGroup: boolean = false;
  @Input()
  public parentForm: FormGroup;
  @Input()
  public childFormGroup: FormGroupName;
  @Input()
  public controlName: any;
  @Input()
  public style: any = { width: "100%" };
  @Input()
  public isFilter: boolean = true;
  @Input()
  public label: string = "";
  @Input()
  public items: any[];
  @Input()
  public selectedItem: any;
  @Output()
  public onItemChange = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {
  }

  public onChange(event: any): void {
    this.onItemChange.emit(event);
  }
}
