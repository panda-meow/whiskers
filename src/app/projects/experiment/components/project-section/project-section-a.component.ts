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
    content: String 
    constructor() {}

    get paragraphs(): string[] {
        return this.content.trim().replace('\r\n','\n').split('\n\n');
    }
}