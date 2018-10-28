import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'pa-pawn-edit',
  templateUrl: './pawn-edit.component.html',
  styleUrls: ['./pawn-edit.component.scss']
})
export class PawnEditComponent implements OnInit {
  @Input()
  public form: FormGroup;

  constructor() { }

  ngOnInit(): void { }
}
