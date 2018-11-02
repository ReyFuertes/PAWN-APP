import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalService } from '../../../../services/modal.service';
import { Item } from '../../../../models/item.model';
import { Option } from '../../../../models/option.model';
import { AEMode } from '../../../../models/crud.enum';
import { RenewalService } from '../../renewal.service';
import { Renewal } from '../../../../models/renewal.model';

@Component({
  selector: 'pa-renewal-detail',
  templateUrl: './renewal-detail.component.html',
  styleUrls: ['./renewal-detail.component.scss']
})
export class RenewalDetailComponent implements OnInit {
  @Input()
  public pageTitle: string = '';
  @Input()
  public form: FormGroup;
  @Input()
  public aeMode: AEMode;

  public renewalTypes: Option[] = [];

  constructor( private renewalService: RenewalService, public modalService: ModalService) { 
  }

  public onSubmit(): void {
    const data: Renewal = <Renewal>this.form.value;
    this.renewalService.saveRenewal(data).subscribe(() => {
      this.form.reset();
      this.modalService.propagate();
    })
  }

  public getTypes(): void {
    this.renewalService.getTypes().subscribe(response => {
      response.types.forEach(type => {
        const _type = {
          label: type.name,
          value: type.name
        }
        this.renewalTypes.push(_type);
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
