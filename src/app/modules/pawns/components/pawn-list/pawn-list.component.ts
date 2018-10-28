import { Component, OnInit } from "@angular/core";
import { PageVar } from "../../../../models/pages.model";
import { Pawn } from "../../../../models/pawn.model";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import {MessageService} from 'primeng/api';
import { Subject } from "rxjs";
import { PawnService } from "../../pawn.service";
import { AEMode } from "../../../../models/crud.enum";

@Component({
  selector: "pa-pawn-list",
  templateUrl: "./pawn-list.component.html",
  styleUrls: ["./pawn-list.component.scss"]
})
export class PawnListComponent implements OnInit {
  public showModal: boolean = false;
  public pawns: Pawn[];
  public selections: Pawn[];
  public editMode: AEMode;
  public totalRecords: number;
  public aeMode: AEMode;
  public form: FormGroup;
  public searchTerm$ = new Subject<string>();

  constructor(
    private formBuilder: FormBuilder,
    private pawnService: PawnService,
    private messageService: MessageService
  ) {
    this.form = this.formBuilder.group({
      pawnTicketNumber: ["", Validators.compose([Validators.required])],
      datePawnGranted: ["", Validators.compose([Validators.required])],
      maturityDate: ["", Validators.compose([Validators.required])],
      expiryDate: ["", Validators.compose([Validators.required])],
      birthDate: ["", Validators.compose([Validators.required])],
      interest: ["", Validators.compose([Validators.required])],
      pawnAmount: ["", Validators.compose([Validators.required])],
      pawnTotalAmount: ["", Validators.compose([Validators.required])],
      accountId: ["", Validators.compose([Validators.required])],
      itemId: ["", Validators.compose([Validators.required])],
      created: ["", Validators.compose([Validators.required])]
    });
    this.pawnService.searchPawn(this.searchTerm$).subscribe(results => this.pawns = results.pawns);
  }

  public load(pageVar: PageVar): void {
    this.pawnService.getPawns(pageVar).subscribe(response => {
      this.pawns = response.pawns;
      this.totalRecords = response.totalCount;
      console.log("%cPawns loaded..", "background:green;color:#fff");
    });
  }

  ngOnInit() {
    this.load({ limit: 10, offset: 0 });
  }

  public onSearch(event: any): void {
    this.searchTerm$.next(event.target.value)
  }

  public onClose(event: boolean): void {
    this.showModal = event;

    if (!this.showModal) {
      this.load({ limit: 10, offset: 0 });
    }
  }

  public onAdd(): void {
    this.showModal = !this.showModal;
    this.aeMode = AEMode.add;
  }

  public onEdit(): void {
    if (this.selections[0].id) {
      this.showModal = !this.showModal;
      this.aeMode = AEMode.edit;
      this.pawnService
        .editPawn(this.selections[0].id)
        .subscribe(response =>
          this.form.patchValue(<FormGroup>response.pawns[0])
        );
    }
  }

  public onDelete(): void {
    this.showConfirm();
  }

  public paginate(event: any): void {
    this.load({ limit: event.rows, offset: event.first });
  }

  public showConfirm(): void {
    this.messageService.clear();
    this.messageService.add({key: 'c', sticky: true, severity:'warn', summary:'Are you sure?', detail:'Confirm to Delete'});
  }

  public onConfirm(): void {
    this.pawnService.deletePawn(this.selections[0].id).subscribe(response => {
        this.pawns = response.pawns
        this.messageService.clear('c');
      }
    );
  }

  public onReject(): void {
    this.messageService.clear('c');
  }
}
