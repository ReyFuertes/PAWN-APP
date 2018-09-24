import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pa-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: [ './account-detail.component.scss' ]
})

export class AccountDetailComponent implements OnInit {
  @Input()
  public pageTitle: string = '';
  @Input()
  public btnText: string = 'Save';

  constructor() { }

  ngOnInit() { }
}