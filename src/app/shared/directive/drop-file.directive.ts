import { Directive, EventEmitter, HostListener, Output, Renderer, ElementRef } from "@angular/core";

@Directive({
  selector: "[appDnd]",
  host: {
    '(dragover)': 'onDragOver($event)',
    '(drop)': 'onDrop($event)'
}
})
export class DndDirective {
  @Output() private filesChangeEmiter : EventEmitter<any> = new EventEmitter();
  @Output() private dragOver : EventEmitter<boolean> = new EventEmitter();
  @Output() private dragLeave : EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  public onDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
    this.dragOver.emit(true);
  }

  public onDrop = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    this.dragOver.emit(false);

    let files = event.dataTransfer.files;
    if (files.length > 0) {
      this.filesChangeEmiter.emit(files[0]);
    }
  }
}

