import { Component, OnInit, Input, Renderer, ViewChild, AfterViewChecked } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalService } from '../../../../services/modal.service';
import { AccountService, AccountEntityService } from '../../account.service';
import { Account } from '../../../../models/account.model';
import { AEMode } from '../../../../models/crud.enum';
import { GenericDetailComponent } from '../../../../core/generics/generic-detail.component';
import { ImageFolder } from '../../../../models/image.enum';
import { ActionService } from '../../../../services/action.service';
import { EntityPrefix } from '../../../../models/entity-prefix.enum';

@Component({
  selector: 'pa-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss']
})

export class AccountDetailComponent extends GenericDetailComponent implements OnInit {
  @Input()
  public pageTitle: string = '';
  @Input()
  public uuid: string;

  public aeMode: AEMode;
  public blob: any;
  public form: FormGroup;

  constructor(private accountEntityService: AccountEntityService, private formBuilder: FormBuilder, private actionService: ActionService, private accountService: AccountService, public modalService: ModalService) {
    super();

    this.form = this.formBuilder.group({
      id: [""],
      idNumber: ["", Validators.compose([Validators.required])],
      firstName: ["", Validators.compose([Validators.required])],
      middleName: ["", Validators.compose([Validators.required])],
      lastName: ["", Validators.compose([Validators.required])],
      phoneNumber: ["", Validators.compose([Validators.required])],
      mobileNumber: ["", Validators.compose([Validators.required])],
      birthDate: ["", Validators.compose([Validators.required])],
      validId: ["", Validators.compose([Validators.required])],
      validIdNumber: ["", Validators.compose([Validators.required])],
      address: ["", Validators.compose([Validators.required])],
      image: [null]
    });

    this.actionService.aeMode$.subscribe(mode => {
      if (mode === AEMode.add) {
        this.form.get('idNumber').patchValue(this.genUuid(EntityPrefix.Account));
      } else if(mode === AEMode.edit) {}
      this.aeMode = mode;
    })

    this.accountEntityService.account$.subscribe(acc => {
      this.form.patchValue(<FormGroup>acc);
    })
  }

  public onSubmit(): void {
    if (this.blob) {
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
    if (image) {
      this.form.get('image').patchValue(image.files[0].filename);
    }

    const data: Account = <Account>this.form.value;
    if (this.aeMode === AEMode.add) {
      this.accountService.saveAccount(data).subscribe()
    } else {
      this.accountService.updateAccount(data.id.toString(), data).subscribe()
    }

    this.modalService.propagate();
  }

  ngOnInit() { }

  public onClose(): void {
    this.form.reset();
    this.modalService.propagate();
    this.actionService.setEntity(null);
  }

  public handleImageChange(event: any): void {
    this.blob = event;
  }
}
