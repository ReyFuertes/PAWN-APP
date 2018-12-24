import { Component, OnInit, Input, ViewChild, Renderer, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalService } from '../../../../services/modal.service';
import { PawnService } from '../../pawn.service';
import { Pawn } from '../../../../models/pawn.model';
import { Option } from '../../../../models/option.model';
import { AccountService } from '../../../accounts/account.service';
import { ItemService } from '../../../items/item.service';
import { AEMode } from '../../../../models/crud.enum';
import { GenericDetailComponent } from '../../../../core/generics/generic-detail.component';
import { EntityPrefix } from '../../../../models/entity-prefix.enum';

@Component({
  selector: 'pa-pawn-detail',
  templateUrl: './pawn-detail.component.html',
  styleUrls: [ './pawn-detail.component.scss' ]
})

export class PawnDetailComponent extends GenericDetailComponent implements OnInit {
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

  public style: any; // = {'position': 'fixed', 'overflow': 'visible', 'z-index': '999'};

  public interestOptions: any[];

  constructor(private itemService: ItemService, private accountService: AccountService, private pawnService: PawnService, public modalService: ModalService) { 
    super();

    this.interestOptions = [ {
      value: 'In Advance',
      label: 'In Advance'
    }, {
      value: 'In Arrears',
      label: 'In Arrears'
    } ]
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
    this.form.get('pawnTicketNumber').patchValue(this.genUuid(EntityPrefix.Pawn));
  }

  public onClose(): void {
    this.modalService.propagate();
    this.form.reset();
  }

  public onAccountChange(event: any): void {
    if(event.value) {
      this.accountService.getOne(event.value).subscribe(response => {
        let control = this.form.controls['account'];
        control.get('id').patchValue(response.account[0].id);
        control.get('birthDate').patchValue(response.account[0].birthDate);
        control.get('contactNumber').patchValue(response.account[0].phoneNumber);
        control.get('address').patchValue(response.account[0].address);
      })
    }
  }

  public onItemChange(event: any): void {
    if(event.value) {
      this.itemService.getOne(event.value).subscribe(response => {
        let control = this.form.controls['item'];

        control.get('id').patchValue(response.item.id);
        control.get('itemName').patchValue(response.item.itemName);
        control.get('itemType').patchValue(response.item.itemType);
        control.get('grams').patchValue(response.item.grams);
        control.get('karat').patchValue(response.item.karat);
        control.get('description').patchValue(response.item.description);
      })
    }
  }

}