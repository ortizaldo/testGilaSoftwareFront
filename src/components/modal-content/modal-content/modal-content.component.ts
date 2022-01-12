import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Inject,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-modal-content",
  templateUrl: "./modal-content.component.html",
  styleUrls: ["./modal-content.component.scss"],
})
export class ModalContentComponent implements OnInit {
  @ViewChild("content", { read: ViewContainerRef }) vcr;

  @Input() title: string;

  @Input() bodyClass: string;

  constructor(
    @Inject("contentComponent") private contentComponent: any,
    @Inject("contentData") private contentData: any,
    public activeModal: NgbActiveModal,
    private cfr: ComponentFactoryResolver
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    // if (this.contentComponent) {
    //   const cmpRef: ComponentRef<any> = this.vcr.createComponent(
    //     this.cfr.resolveComponentFactory(this.contentComponent)
    //   );
    //   for (let [key, value] of Object.entries(this.contentData)) {
    //     cmpRef.instance[key] = value;
    //   }
    //   cmpRef.hostView.detectChanges();
    // }
  }
}
