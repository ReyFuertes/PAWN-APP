import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AEMode } from '../../../../models/crud.enum';

@Component({
  selector: 'pa-item-new',
  templateUrl: './item-new.component.html',
  styleUrls: ['./item-new.component.scss']
})
export class ItemNewComponent implements OnInit {
  @Input()
  public form: FormGroup;

  public mode: AEMode.add;

  constructor() { }

  ngOnInit() { }
}
