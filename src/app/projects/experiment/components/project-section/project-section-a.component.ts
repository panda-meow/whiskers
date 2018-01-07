import { Component, Input } from '@angular/core';


@Component({
    selector: 'project-section-a',
    styleUrls: ['../../../project-detail/project-detail.component.scss'],
    templateUrl: './project-section-a.component.html',
})

export class ProjectSectionComponentA {
    @Input()
    image: String 
    @Input()
    value: String 
    constructor() {}
    //constructor(value: String) {}
}