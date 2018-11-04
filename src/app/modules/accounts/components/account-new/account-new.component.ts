import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AEMode } from '../../../../models/crud.enum';

@Component({
  selector: 'pa-account-new',
  templateUrl: './account-new.component.html',
  styleUrls: [ './account-new.component.scss' ]
})

export class AccountNewComponent implements OnInit {
  @Input()
  public form: FormGroup;

  public mode = AEMode.add;

  constructor() { }

  ngOnInit() { }
}