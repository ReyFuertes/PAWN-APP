import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PrintEntity } from '../../models/print-entity.model';

@Component({
  selector: 'pa-print-preview',
  templateUrl: './print-preview.component.html',
  styleUrls: ['./print-preview.component.scss']
})
export class PrintPreviewComponent implements OnInit {
  @Input()
  public printEntity: PrintEntity;

  public style = {position: 'fixed', overflow: 'visible', 'z-index': '999'};
  public showPrintModal: boolean = false;
  public form: FormGroup;
  
  constructor(private router: Router, private formBuilder: FormBuilder,) {
    this.form = this.formBuilder.group({
      printFrom: ["", Validators.compose([Validators.required])],
      printTo: ["", Validators.compose([Validators.required])]
    });
   }

  ngOnInit(): void { }

  public onClose(): void {
    this.showPrintModal = !this.showPrintModal;
  }

  public onSubmit(): void {
    if(this.printEntity) {
      this.router.navigate(['print-page', {
        printEntity: this.printEntity, 
        printFrom: this.form.get('printFrom').value,
        printTo: this.form.get('printTo').value 
      }])
    }
  }
}
