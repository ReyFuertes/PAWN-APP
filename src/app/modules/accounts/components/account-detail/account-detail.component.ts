import { Component, OnInit, Input, ViewChild, Renderer, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalService } from '../../../../services/modal.service';
import { AccountService } from '../../account.service';
import { Account } from '../../../../models/account.model';
import { AEMode } from '../../../../models/crud.enum';
import { GenericDetailComponent } from '../../../../core/generics/generic-detail.component';
import { EntityPrefix } from '../../../../models/entity-prefix.enum';

@Component({
  selector: 'pa-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: [ './account-detail.component.scss' ]
})

export class AccountDetailComponent extends GenericDetailComponent implements OnInit {
  @Input()
  public pageTitle: string = '';
  @Input()
  public form: FormGroup;
  @Input()
  public aeMode: AEMode;

  public imageDisplayUrl: string = '';
  public blob: any;

  constructor(private renderer: Renderer, private accountService: AccountService, public modalService: ModalService) { 
    super();
  }

  public onSubmit(): void {
    const data: Account = <Account>this.form.value;
    
    if(this.aeMode === AEMode.add) {
      debugger
      this.accountService.saveAccount(data).subscribe(() => {
        this.form.reset();
        this.modalService.propagate();
      })
    } else {
      this.accountService.updateAccount(data.id.toString(), data).subscribe(() => {
        this.form.reset();
        this.modalService.propagate();
      })
    }
  }

  ngOnInit() { 
    this.form.get('idNumber').patchValue(this.genUuid(EntityPrefix.Account));
  }

  public onClose(): void {
    this.modalService.propagate();
    this.form.reset();
  }

  public handleImageChange(event: any): void {
    this.blob = event;
  }
}