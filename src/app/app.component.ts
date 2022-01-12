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

  }
}
