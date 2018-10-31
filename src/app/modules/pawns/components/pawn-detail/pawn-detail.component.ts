import { Component, OnInit, Input, ViewChild, Renderer, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalService } from '../../../../services/modal.service';
import { PawnService } from '../../pawn.service';
import { Pawn } from '../../../../models/pawn.model';
import { Option } from '../../../../models/option.model';
import { AccountService } from '../../../accounts/account.service';
import { ItemService } from '../../../items/item.service';

@Component({
  selector: 'pa-pawn-detail',
  templateUrl: './pawn-detail.component.html',
  styleUrls: [ './pawn-detail.component.scss' ]
})

export class PawnDetailComponent implements OnInit {
  @Input()
  public pageTitle: string = '';
  @Input()
  public form: FormGroup;
  @Input()
  public accounts: Option[];
  @Input()
  public items: Option[];

  constructor(private itemService: ItemService, private accountService: AccountService, private pawnService: PawnService, public modalService: ModalService) { 
  }

  public onSubmit(): void {
    const data: Pawn = <Pawn>this.form.value;
    this.pawnService.savePawn(data).subscribe(() => {
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

  public onAccountChange(event: any): void {
    if(event.value) {
      this.accountService.getOne(event.value).subscribe(response => {
        console.log(response.account);
        // this.form.get('id').setValue(response.account[0].id)
        // this.form.get('birthDate').setValue(response.account[0].birthday)
        // this.form.get('contactNumber').setValue(response.account[0].phoneNumber)
        // this.form.get('address').setValue(response.account[0].address)
      })
    }
  }

  public onItemChange(event: any): void {
    if(event.value) {
      this.itemService.getOne(event.value).subscribe(response => {
        this.form.get('id').setValue(response.item[0].id);
        this.form.get('itemName').setValue(response.item[0].itemName);
        this.form.get('itemType').setValue(response.item[0].itemType);
        this.form.get('grams').setValue(response.item[0].grams);
        this.form.get('karat').setValue(response.item[0].karat);
        this.form.get('description').setValue(response.item[0].description);
      })
    }
  }

}