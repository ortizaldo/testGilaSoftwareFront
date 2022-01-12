import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SvgIconRegistryService } from 'angular-svg-icon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent{
  constructor(
    private router: Router,
    private iconReg: SvgIconRegistryService,
  ) {
    this.iconReg.loadSvg("/assets/img/icons/close_24px.svg", "close");
    this.iconReg.loadSvg("/assets/img/icons/box-closed-svgrepo-com.svg", "closed");
    this.iconReg.loadSvg("/assets/img/icons/edit_24px.svg", "edit");
    this.iconReg.loadSvg("/assets/img/icons/history_24px.svg", "history");
    this.iconReg.loadSvg("/assets/img/icons/ver_24px.svg", "ver");
    this.iconReg.loadSvg("/assets/img/icons/refresh_24px.svg", "refresh");
    this.iconReg.loadSvg("/assets/img/icons/trash_24px.svg", "trash");
    this.iconReg.loadSvg("/assets/img/icons/plus_sign_24px.svg", "plus");
    this.iconReg.loadSvg("/assets/img/icons/save_24px.svg", "save");

  }
}
