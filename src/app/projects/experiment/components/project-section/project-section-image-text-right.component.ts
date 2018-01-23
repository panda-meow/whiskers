import { Component, Input } from '@angular/core';


@Component({
    selector: 'project-section-image-text-right',
    styleUrls: ['../../../project-detail/project-detail.component.scss'],
    templateUrl: './project-section-image-text-right.component.html',
})

export class ProjectSectionImageTextRightComponent {
    @Input()
    image: String;
    @Input()
    content: String;
    constructor() {}
   paragraph: string;
    get paragraphs(): string[] {
        return this.content.trim().replace('\r\n', '\n').split('\n\n');
    }
}
