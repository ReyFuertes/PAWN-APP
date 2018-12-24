import { Component, OnInit, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { AEMode } from "../../../../models/crud.enum";
import { GenericEditComponent } from "../../../../core/generics/generic-edit.component";

@Component({
  selector: "pa-account-edit",
  templateUrl: "./account-edit.component.html",
  styleUrls: ["./account-edit.component.scss"]
})
export class AccountEditComponent extends GenericEditComponent implements OnInit {
  @Input()
  public form: FormGroup;

  public mode = AEMode.edit;

  constructor() {
    super();
  }

  ngOnInit() {}
}
