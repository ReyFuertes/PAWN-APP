import { Component, OnInit, ViewChild } from "@angular/core";
import { PageVar } from "../../../../models/pages.model";
import { Renewal } from "../../../../models/renewal.model";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { MessageService } from "primeng/api";
import { Subject } from "rxjs";
import { AEMode } from "../../../../models/crud.enum";
import { RenewalService } from "../../../renewals/renewal.service";
import { RenewalTableComponent } from "../renewal-table/renewal-table.component";

@Component({
  selector: 'pa-renewal-list',
  templateUrl: './renewal-list.component.html',
  styleUrls: ['./renewal-list.component.scss']
})
export class RenewalListComponent implements OnInit {
  public showModal: boolean = false;
  public renewals: Renewal[];
  public selections: Renewal[];
  public editMode: AEMode;
  public totalRecords: number;
  public aeMode: AEMode;
  public form: FormGroup;
  public searchTerm$ = new Subject<string>();

  @ViewChild("renewalTable") renewalTable: RenewalTableComponent;

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private renewalService: RenewalService
  ) {

    this.form = this.formBuilder.group({
      id: [""],
      renewalDate: ["", Validators.compose([Validators.required])],
      renewalPawnTicket: ["", Validators.compose([Validators.required])],
      renewalAmount: ["", Validators.compose([Validators.required])],
      renewalTotalAmount: ["", Validators.compose([Validators.required])],
      interest: ["", Validators.compose([Validators.required])],
      difference: ["", Validators.compose([Validators.required])],
      remarks: ["", Validators.compose([Validators.required])],
      created: ["", Validators.compose([Validators.required])],
      modified: ["", Validators.compose([Validators.required])],
      pawnId: ["", Validators.compose([Validators.required])]
    });

    //this.renewalService.searchRenewal(this.searchTerm$).subscribe(results => (this.renewals = results.renewals));
  }

  public load(pageVar: PageVar): void {
    this.renewalService.getRenewals(pageVar).subscribe(response => {
      this.renewals = response.renewals;
      this.totalRecords = response.totalCount;
      console.log("%cRenewals loaded..", "background:green;color:#fff");
    });
  }

  ngOnInit() {
    this.load({ limit: 10, offset: 0 });
  }

  /**
   * Temporary number limit
   */
  private maxNum(): number {
    return Math.floor(Math.random() * 50);
  }

  public onSearch(event: any): void {
    this.searchTerm$.next(event.target.value);
  }

  public onRefresh(): void {
    this.load({ limit: 10, offset: 0 });
    //this.renewalTable.onRowUnselect();
  }

  public onClose(event: boolean): void {
    this.showModal = event;

    if (!this.showModal) {
      this.load({ limit: 10, offset: 0 });
    }

    //this.renewalTable.onRowUnselect();
  }

  public onAdd(): void {
    this.showModal = !this.showModal;
    this.aeMode = AEMode.add;
  }

  public onEdit(): void {
    if (this.selections[0].id) {
      this.showModal = !this.showModal;
      this.aeMode = AEMode.edit;
      this.renewalService.editRenewal(this.selections[0].id).subscribe(response => {
        this.form.patchValue(<FormGroup>response.renewal);
      });
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
    this.messageService.add({
      key: "c",
      sticky: true,
      severity: "warn",
      summary: "Are you sure?",
      detail: "Confirm to Delete"
    });
  }

  public onConfirm(): void {
    // this.renewalService.deleteRenewal(this.selections[0].id).subscribe(response => {
    //   this.renewals = response.renewals;
    //   this.messageService.clear("c");
    // });
  }

  public onReject(): void {
    this.messageService.clear("c");
  }
}
