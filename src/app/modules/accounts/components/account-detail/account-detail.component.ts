import { Component, OnInit, Input, Renderer, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalService } from '../../../../services/modal.service';
import { AccountService } from '../../account.service';
import { Account } from '../../../../models/account.model';
import { AEMode } from '../../../../models/crud.enum';
import { GenericDetailComponent } from '../../../../core/generics/generic-detail.component';
import { EntityPrefix } from '../../../../models/entity-prefix.enum';
import { ImageFolder } from '../../../../models/image.enum';
import { environment } from '../../../../../environments/environment';

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

  public blob: any;

  constructor(private renderer: Renderer, private accountService: AccountService, public modalService: ModalService) { 
    super();
  }

  public onSubmit(): void {
    if(this.blob) {
      let formData = new FormData();
      formData.append("file", this.blob, this.blob.name.split('.')[1]);
      this.uploadImage(formData, this.saveAccount);
    } else {
      this.saveAccount();
    }
  }

  private uploadImage(formData: any, callback: any) {
    this.accountService.uploadImage(formData, ImageFolder.account).subscribe((response: any) => {
      callback(response);
    })
  }

  public saveAccount = (image?: any) => {   
    if(image) {
      this.form.get('image').patchValue(image.files[0].filename);
    }

    const data: Account = <Account>this.form.value;
    if(this.aeMode === AEMode.add) {
      this.accountService.saveAccount(data).subscribe(() => {
        this.modalService.propagate();
      })
    } else {
      this.accountService.updateAccount(data.id.toString(), data).subscribe(() => {
        this.modalService.propagate();
      })
    }
  }

  ngOnInit() { 
    if(this.aeMode === AEMode.add) {
      this.form.get('idNumber').patchValue(this.genUuid(EntityPrefix.Account));
    }
  }

  public onClose(): void {
    this.modalService.propagate();
    this.form.reset();
  }

  public handleImageChange(event: any): void {
    console.log(event);
    this.blob = event;
  }
}