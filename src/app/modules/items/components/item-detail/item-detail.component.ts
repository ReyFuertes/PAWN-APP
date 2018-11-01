import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalService } from '../../../../services/modal.service';
import { ItemService } from '../../item.service';
import { Item } from '../../../../models/item.model';
import { Option } from '../../../../models/option.model';
import { AEMode } from '../../../../models/crud.enum';

@Component({
  selector: 'pa-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {
  @Input()
  public pageTitle: string = '';
  @Input()
  public form: FormGroup;
  @Input()
  public aeMode: AEMode;

  public itemTypes: Option[] = [];

  constructor( private itemService: ItemService, public modalService: ModalService) { 
  }

  public onSubmit(): void {
    const data: Item = <Item>this.form.value;
    this.itemService.saveItem(data).subscribe(() => {
      this.form.reset();
      this.modalService.propagate();
    })
  }

  public getTypes(): void {
    this.itemService.getTypes().subscribe(response => {
      response.types.forEach(type => {
        const _type = {
          label: type.name,
          value: type.name
        }
        this.itemTypes.push(_type);
      });
    });
  }

  ngOnInit() { 
    this.getTypes();
  }

  public onClose(): void {
    this.modalService.propagate();
    this.form.reset();
  }
}


