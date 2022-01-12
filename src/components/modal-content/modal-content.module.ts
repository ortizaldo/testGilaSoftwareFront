import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { AngularSvgIconModule } from "angular-svg-icon";
import { ModalCloseButtonModule } from "components/modal-close-button/modal-close-button.module";
import { ModalContentComponent } from "./modal-content/modal-content.component";

@NgModule({
  declarations: [ModalContentComponent],
  imports: [TranslateModule, AngularSvgIconModule, ModalCloseButtonModule],
  exports: [ModalContentComponent],
})
export class ModalContentModule {}
