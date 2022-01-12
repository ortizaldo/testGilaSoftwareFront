import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AngularSvgIconModule } from "angular-svg-icon";
import { ModalCloseButtonComponent } from "./modal-close-button/modal-close-button.component";

@NgModule({
  declarations: [ModalCloseButtonComponent],
  imports: [CommonModule, AngularSvgIconModule],
  exports: [ModalCloseButtonComponent],
})
export class ModalCloseButtonModule {}
