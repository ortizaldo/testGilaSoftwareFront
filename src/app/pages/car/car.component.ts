import { Component, OnInit } from '@angular/core';

declare interface TableData {
    headerRow: string[];
    dataRows: string[][];
}

@Component({
    selector: 'car-cmp',
    moduleId: module.id,
    templateUrl: 'car.component.html'
})

export class CarComponent implements OnInit{
    ngOnInit(){
        
    }
}
