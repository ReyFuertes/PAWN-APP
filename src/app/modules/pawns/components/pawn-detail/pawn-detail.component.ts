import { Component, OnInit, Input, ViewChild, Renderer, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalService } from '../../../../services/modal.service';
import { PawnService } from '../../pawn.service';
import { Pawn } from '../../../../models/pawn.model';
import { Option } from '../../../../models/option.model';
import { AccountService } from '../../../accounts/account.service';
import { ItemService } from '../../../items/item.service';
import { AEMode } from '../../../../models/crud.enum';

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
  @Input()
  public aeMode: AEMode;

  constructor(private itemService: ItemService, private accountService: AccountService, private pawnService: PawnService, public modalService: ModalService) { 
  }

  public onSubmit(): void {
    const data: Pawn = <Pawn>this.form.value;
    
    if(this.aeMode === AEMode.add) {
      this.pawnService.savePawn(data).subscribe(() => {
        this.form.reset();
        this.modalService.propagate();
      })
    } else {
      this.pawnService.updatePawn(data.id.toString(), data).subscribe(() => {
        this.form.reset();
        this.modalService.propagate();
      })
    }
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
        let control = this.form.controls['account'];
        control.get('id').setValue(response.account[0].id);
        control.get('birthDate').setValue(response.account[0].birthDate);
        control.get('contactNumber').setValue(response.account[0].phoneNumber);
        control.get('address').setValue(response.account[0].address);
      })
    }
  }

  public onItemChange(event: any): void {
    if(event.value) {
      this.itemService.getOne(event.value).subscribe(response => {
        let control = this.form.controls['item'];
        control.get('id').setValue(response.item[0].id);
        control.get('itemName').setValue(response.item[0].itemName);
        control.get('itemType').setValue(response.item[0].itemType);
        control.get('grams').setValue(response.item[0].grams);
        control.get('karat').setValue(response.item[0].karat);
        control.get('description').setValue(response.item[0].description);
      })
    }
  }

}