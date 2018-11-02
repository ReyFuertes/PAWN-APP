import { Component, OnInit, Input } from '@angular/core';
import { Option } from '../../../../models/option.model';
import { FormGroup } from '@angular/forms';
import { AEMode } from '../../../../models/crud.enum';

@Component({
  selector: 'pa-renewal-edit',
  templateUrl: './renewal-edit.component.html',
  styleUrls: ['./renewal-edit.component.scss']
})
export class RenewalEditComponent implements OnInit {
  @Input()
  public accounts: Option[];
  @Input()
  public items: Option[];
  @Input()
  public pawns: Option[];

  @Input()
  public form: FormGroup;

  public mode: AEMode.add;

  constructor() { }

  ngOnInit() { }
}
