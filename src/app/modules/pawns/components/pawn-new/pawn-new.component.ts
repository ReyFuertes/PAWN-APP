import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Option } from '../../../../models/option.model';
import { AEMode } from '../../../../models/crud.enum';

@Component({
  selector: 'pa-pawn-new',
  templateUrl: './pawn-new.component.html',
  styleUrls: ['./pawn-new.component.scss']
})
export class PawnNewComponent implements OnInit {
  @Input()
  public accounts: Option[];
  @Input()
  public items: Option[];
  @Input()
  public form: FormGroup;

  public mode: AEMode.add;

  constructor() { }

  ngOnInit(): void { }
}
