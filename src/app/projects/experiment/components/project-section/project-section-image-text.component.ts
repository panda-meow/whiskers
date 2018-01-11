import { Component, Input } from '@angular/core';


@Component({
    selector: 'project-section-image-text',
    styleUrls: ['../../../project-detail/project-detail.component.scss'],
    templateUrl: './project-section-image-text.component.html',
})

export class ProjectSectionImageTextComponent {
    @Input()
    image: String;
    @Input()
    content: String;
    constructor() {}
   paragraph: string;
    get paragraphs(): string[] {
        return this.content.trim().replace('\r\n','\n').split('\n\n');
    }
}
