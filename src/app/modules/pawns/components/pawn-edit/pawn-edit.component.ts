import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Option } from '../../../../models/option.model';

@Component({
  selector: 'pa-pawn-edit',
  templateUrl: './pawn-edit.component.html',
  styleUrls: ['./pawn-edit.component.scss']
})
export class PawnEditComponent implements OnInit {
  @Input()
  public form: FormGroup;
  @Input()
  public accounts: Option[];
  @Input()
  public items: Option[];

  constructor() { }

  ngOnInit(): void { }
}
