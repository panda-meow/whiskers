import { Component, Input } from '@angular/core';


@Component({
    selector: 'project-section-b',
    styleUrls: ['../../../project-detail/project-detail.component.scss'],
    templateUrl: './project-section-b.component.html',
})

export class ProjectSectionComponentB {
    @Input()
    image: string 
    @Input()
    content: string 
    @Input()
    items: [[string, string]]

    constructor() {}

    get paragraphs(): string[] {
        return this.content.trim().replace('\r\n','\n').split('\n\n');
    }
}