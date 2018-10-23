
export class GenericModalComponent {
  public closeModal: boolean = false;

  public close(): void {
    this.closeModal = true;
  }

}
