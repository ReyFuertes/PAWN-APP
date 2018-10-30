import { Component, OnInit, Input, ViewChild, Renderer, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalService } from '../../../../services/modal.service';
import { PawnService } from '../../pawn.service';
import { Pawn } from '../../../../models/pawn.model';

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

  constructor(private renderer: Renderer, private pawnService: PawnService, public modalService: ModalService) { 

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
}