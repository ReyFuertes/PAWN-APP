import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalService } from '../../../../services/modal.service';
import { ItemService } from '../../item.service';
import { Item, ItemTypeEnum, ItemColorEnum, ItemBirthstoneEnum } from '../../../../models/item.model';
import { AEMode } from '../../../../models/crud.enum';
import { GenericDetailComponent } from '../../../../core/generics/generic-detail.component';
import { EntityPrefix } from '../../../../models/entity-prefix.enum';

@Component({
  selector: 'pa-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent extends GenericDetailComponent implements OnInit {
  @Input()
  public pageTitle: string = '';
  @Input()
  public form: FormGroup;
  @Input()
  public aeMode: AEMode;

  public itemTypeEnum = ItemTypeEnum;
  public itemTypes: any[] = [];

  public itemColorEnum = ItemColorEnum;
  public itemColors: any[] = [];

  public itemBirthstoneEnum = ItemBirthstoneEnum;
  public itemBirthstones: any[] = [];
  
  @ViewChild('bdTooltip') bdTooltip: any;

  constructor( private itemService: ItemService, public modalService: ModalService) { 
    super();

    //item types
    let typeEnum = Object.keys(this.itemTypeEnum);
    typeEnum = typeEnum.slice(typeEnum.length / 2);
    typeEnum.forEach(val => {
      this.itemTypes.push({ label: val, value: val })
    });
    
    //item color
    let ColorsEnum = Object.keys(this.itemColorEnum);
    ColorsEnum = ColorsEnum.slice(ColorsEnum.length / 2);
    ColorsEnum.forEach(val => {
      this.itemColors.push({ label: val, value: val })
    });

    //item birthstones
    let BirthstonesEnum = Object.keys(this.itemBirthstoneEnum);
    BirthstonesEnum = BirthstonesEnum.slice(BirthstonesEnum.length / 2);
    BirthstonesEnum.forEach(val => {
      this.itemBirthstones.push({ label: val, value: val })
    });
    
  }

  public onSubmit(): void {
    const data: Item = <Item>this.form.value;
    this.itemService.saveItem(data).subscribe(() => {
      this.form.reset();
      this.modalService.propagate();
    })
  }

  public getTypes(): void {
    // this.itemService.getTypes().subscribe(response => {
    //   response.types.forEach(type => {
    //     const _type = {
    //       label: type.name,
    //       value: type.name
    //     }
    //     this.itemTypes.push(_type);
    //   });
    // });
  }

  ngOnInit() { 
    this.getTypes();

    this.form.get('sku').patchValue(this.genUuid(EntityPrefix.Item));
  }

  public onClose(): void {
    this.modalService.propagate();
    this.form.reset();
  }
}


