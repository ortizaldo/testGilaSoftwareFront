import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-modal-close-button",
  templateUrl: "./modal-close-button.component.html",
  styleUrls: ["./modal-close-button.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ModalCloseButtonComponent implements OnInit {
  @Input() modal: NgbActiveModal;

  constructor() {}

  ngOnInit() {
    // Empty function
  }

  dismiss() {
    this.modal.close();
  }
}
