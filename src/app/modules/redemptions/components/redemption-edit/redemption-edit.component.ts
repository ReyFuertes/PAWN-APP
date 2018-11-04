import { Component, OnInit, Input } from '@angular/core';
import { Option } from '../../../../models/option.model';
import { FormGroup } from '@angular/forms';
import { AEMode } from '../../../../models/crud.enum';

@Component({
  selector: 'pa-redemption-edit',
  templateUrl: './redemption-edit.component.html',
  styleUrls: ['./redemption-edit.component.scss']
})
export class RedemptionEditComponent implements OnInit {
  @Input()
  public accounts: Option[];
  @Input()
  public items: Option[];
  @Input()
  public pawns: Option[];

  @Input()
  public form: FormGroup;

  public mode = AEMode.add;

  constructor() { }

  ngOnInit() { }
}
