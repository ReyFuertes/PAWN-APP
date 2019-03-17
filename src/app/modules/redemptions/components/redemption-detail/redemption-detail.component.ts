import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalService } from '../../../../services/modal.service';
import { Item } from '../../../../models/item.model';
import { Option } from '../../../../models/option.model';
import { AEMode } from '../../../../models/crud.enum';
import { RedemptionService } from '../../redemption.service';
import { AccountService } from '../../../accounts/account.service';
import { ItemService } from '../../../items/item.service';
import { Redemption } from '../../../../models/redemption.mode';

@Component({
  selector: 'pa-redemption-detail',
  templateUrl: './redemption-detail.component.html',
  styleUrls: ['./redemption-detail.component.scss']
})
export class RedemptionDetailComponent implements OnInit {
  @Input()
  public pageTitle: string = '';
  @Input()
  public form: FormGroup;
  @Input()
  public aeMode: AEMode;
  @Input()
  public accounts: Option[];
  @Input()
  public items: Option[];
  @Input()
  public pawns: Option[];
  
  public redemptionTypes: Option[] = [];

  constructor(private accountService: AccountService, private itemService: ItemService, private redemptionService: RedemptionService, public modalService: ModalService) { 
  }

  public onSubmit(): void {
    const data: Redemption = <Redemption>this.form.value;
    if(this.aeMode === AEMode.add) {
      this.redemptionService.saveRedemption(data).subscribe(() => {
        this.form.reset();
        this.modalService.propagate();
      })
    } else {
      this.redemptionService.updateRedemption(data.id.toString(), data).subscribe(() => {
        this.form.reset();
        this.modalService.propagate();
      })
    }

  }

  ngOnInit() { 
  }

  public onAccountChange(value: any): void {
    if(value) {
      this.accountService.getOne(value).subscribe(response => {
        let control = this.form.controls['account'];
        control.get('id').setValue(response.account[0].id);
        control.get('birthDate').setValue(response.account[0].birthDate);
        control.get('contactNumber').setValue(response.account[0].phoneNumber);
        control.get('address').setValue(response.account[0].address);
      })
    }
  }

  public onItemChange(value: any): void {
    if(value) {
      this.itemService.getOne(value).subscribe(response => {
        let control = this.form.controls['item'];
        control.get('id').setValue(response.item.id);
        control.get('sku').setValue(response.item.sku);
        control.get('itemName').setValue(response.item.itemName);
        control.get('itemType').setValue(response.item.itemType);
        control.get('grams').setValue(response.item.grams);
        control.get('karat').setValue(response.item.karat);
        control.get('description').setValue(response.item.description);
      })
    }
  }

  public onPawnChange(event: any): void {
    if(event.value) {

    }
  }

  public onClose(): void {
    this.modalService.propagate();
    this.form.reset();
  }
}
