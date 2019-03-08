import { Component, OnInit, Input,  Output,  EventEmitter,  HostListener} from "@angular/core";
import { GenericModalComponent } from "../../core/generics/generic-modal.component";
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
  public width: string = "100%";
  @Input()
  public height: string = "100%";
  @Input()
  public positionTop: number = 20;
  @Input()
  public contentStyle: any;
  @Input()
  public showFooter: boolean = false;

  @Output()
  public closeModal = new EventEmitter<boolean>();

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

  // @HostListener("document:keydown.escape", ["$event"])
  // onKeydownHandler(event: KeyboardEvent) {
  //   event.preventDefault();
  //   if(document.querySelector('.lpa-modal')) {
  //     this.close();
  //   }
  // }
}
