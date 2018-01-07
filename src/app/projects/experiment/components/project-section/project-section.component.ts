import { Component, Input } from '@angular/core';


@Component({
    selector: 'project-section',
    templateUrl: './project-section-b.component.html',
})

export class ProjectSectionComponent {
    @Input()
    value: String 
    constructor() {}
    //constructor(value: String) {}
}