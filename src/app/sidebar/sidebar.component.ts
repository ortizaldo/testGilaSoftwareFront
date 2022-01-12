import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
// <i class="fas fa-car"></i>
export const ROUTES: RouteInfo[] = [
    // { path: '/user',          title: 'Usuarios',      icon:'nc-single-02',  class: '' },
    { path: '/car',         title: 'Automoviles',        icon:'nc-icon nc-bullet-list-67',    class: '' },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
