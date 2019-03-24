import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalService } from '../../../../services/modal.service';
import { ItemService } from '../../item.service';
import { Item, ItemTypeEnum, ItemColorEnum, ItemBirthstoneEnum } from '../../../../models/item.model';
import { AEMode } from '../../../../models/crud.enum';
import { GenericDetailComponent } from '../../../../core/generics/generic-detail.component';
import { EntityPrefix } from '../../../../models/entity-prefix.enum';
import { BranchesEnum } from '../../../../models/branch.enum';

@Component({
  selector: 'pa-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent extends GenericDetailComponent implements OnInit {
  @Input()
  public pageTitle: string = '';
  @Input()
  public aeMode: AEMode;
  @Input()
  public item: Item;

  public form: FormGroup;
  public branchesEnum = BranchesEnum;
  public branches: any[] = [];
  public itemTypeEnum = ItemTypeEnum;
  public itemTypes: any[] = [];
  public itemColorEnum = ItemColorEnum;
  public itemColors: any[] = [];
  public itemBirthstoneEnum = ItemBirthstoneEnum;
  public itemBirthstones: any[] = [];
  
  @Output()
  public formEmitter = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder, private itemService: ItemService, public modalService: ModalService) { 
    super();

    this.form = this.formBuilder.group({
      id: [""],
      branches: ["", Validators.compose([Validators.required])],
      sku: ["", Validators.compose([Validators.required])],
      itemName: ["", Validators.compose([Validators.required])],
      itemType: ["", Validators.compose([Validators.required])],
      grams: ["", Validators.compose([Validators.required])],
      karat: ["", Validators.compose([Validators.required])],
      description: ["", Validators.compose([Validators.required])],
      image: [""],
      noneJewelry: [""],
      birthStoneDetails: ["", Validators.compose([Validators.required])],
      titusDetails: ["", Validators.compose([Validators.required])],
    });

    //BRANCHES
    let branchesEnum = Object.keys(this.branchesEnum);
    branchesEnum = branchesEnum.slice(branchesEnum.length / 2);
    branchesEnum.forEach(val => {
      this.branches.push({ label: val, value: val })
    });

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
    
    this.form.valueChanges.subscribe(() => this.formEmitter.emit(this.form));
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


