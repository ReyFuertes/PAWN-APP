import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AEMode } from '../../../../models/crud.enum';

@Component({
  selector: 'pa-renewal-new',
  templateUrl: './renewal-new.component.html',
  styleUrls: ['./renewal-new.component.scss']
})
export class RenewalNewComponent implements OnInit {
  @Input()
  public form: FormGroup;

  public mode: AEMode.add;

  constructor() { }

  ngOnInit() { }
}
