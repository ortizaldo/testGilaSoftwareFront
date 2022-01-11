import { Routes } from '@angular/router';

import { UserComponent } from '../../pages/user/user.component';
import { CarComponent } from '../../pages/car/car.component';

export const AdminLayoutRoutes: Routes = [
    { path: '',           component: CarComponent },
    { path: 'user',           component: UserComponent },
    { path: 'table',          component: CarComponent },
];
