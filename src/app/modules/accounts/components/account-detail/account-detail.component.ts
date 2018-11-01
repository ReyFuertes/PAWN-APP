import { Component, OnInit, Input, ViewChild, Renderer, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalService } from '../../../../services/modal.service';
import { AccountService } from '../../account.service';
import { Account } from '../../../../models/account.model';

@Component({
  selector: 'pa-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: [ './account-detail.component.scss' ]
})

export class AccountDetailComponent implements OnInit {
  @Input()
  public pageTitle: string = '';
  @Input()
  public form: FormGroup;

  constructor(private renderer: Renderer, private accountService: AccountService, public modalService: ModalService) { 
  }

  public onSubmit(): void {
    const data: Account = <Account>this.form.value;
    this.accountService.saveAccount(data).subscribe(() => {
      this.form.reset();
      this.modalService.propagate();
    })
  }

  ngOnInit() { 
  }

  public onClose(): void {
    this.modalService.propagate();
    this.form.reset();
  }
}