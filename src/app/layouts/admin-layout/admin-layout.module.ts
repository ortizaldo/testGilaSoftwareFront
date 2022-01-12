import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { UserComponent } from '../../pages/user/user.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarComponent } from 'app/pages/car/car.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormCarModule } from 'components/form-car/form-car.module';
import { UtilitiesService } from '@services/utilities/utilities.service';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule,
    TranslateModule,
    FormCarModule,
    AngularSvgIconModule
  ],
  declarations: [
    UserComponent,
    CarComponent,
  ],
  providers: [UtilitiesService],
})

export class AdminLayoutModule {}
