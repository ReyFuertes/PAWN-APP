import { Component, OnInit, Input,  Output,  EventEmitter,  HostListener, ViewChild} from "@angular/core";
import { ModalService } from "../../services/modal.service";

@Component({
  selector: "app-base-modal",
  templateUrl: "./base-modal.component.html",
  styleUrls: ["./base-modal.component.scss"]
})
export class BaseModalComponent implements OnInit {
  @Input()
  public showModal: boolean = false;
  @Input()
  public headerText: string = "Header Text Here";
  @Input()
  public positionTop: number = 20;
  @Input()
  public contentStyle: any = {'width': '950px', 'max-height':'calc(100vh - 100px)', 'overflow-x': 'hidden'};
  @Input()
  public showFooter: boolean = false;

  @Output()
  public closeModal = new EventEmitter<boolean>();

  @ViewChild('dialog') dialog: any;

  constructor(public modaService: ModalService) {
    if(!this.showModal) {
      this.modaService.subscribe(this, this.close);
    }
  }

  ngOnInit(): void {}

  public close(): void {
    this.showModal = !this.showModal;
    this.closeModal.emit(this.showModal);
  }

  @HostListener("document:keydown.escape", ["$event"])
  onKeydownHandler(event: KeyboardEvent) {
    event.preventDefault();
    if(this.dialog) {
      this.closeModal.emit(false);
    }
  }
}
