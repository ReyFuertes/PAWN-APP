import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'pa-pawn-detail',
  templateUrl: './pawn-detail.component.html',
  styleUrls: ['./pawn-detail.component.scss']
})
export class PawnDetailComponent implements OnInit {
  @Input()
  public pageTitle: string = '';
  @Input()
  public form: FormGroup;

  constructor() { }

  ngOnInit(): void { }
}
