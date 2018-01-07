import { Component, Input } from '@angular/core';


@Component({
    selector: 'project-section-b',
    styleUrls: ['../../../project-detail/project-detail.component.scss'],
    templateUrl: './project-section-b.component.html',
})

export class ProjectSectionComponentB {
    @Input()
    image: String 
    @Input()
    items: [[string, string]]

    constructor() {}
}