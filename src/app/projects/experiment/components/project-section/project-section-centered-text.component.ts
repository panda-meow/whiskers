import { Component, Input } from '@angular/core';


@Component({
    selector: 'project-section-centered-text',
    styleUrls: ['../../../project-detail/project-detail.component.scss'],
    templateUrl: './project-section-centered-text.component.html',
})

export class ProjectSectionCenteredTextComponent {

    @Input()
    content: string;
    @Input()
    header: string;
    constructor() {}

    get paragraphs(): string[] {
        return this.content.trim().replace('\r\n', '\n').split('\n\n');
    }
}
