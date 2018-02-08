import { Component, Input } from '@angular/core';


@Component({
    selector: 'project-section-centered-image',
    styleUrls: ['../../../project-detail/project-detail.component.scss'],
    templateUrl: './project-section-centered-image.component.html',
})

export class ProjectSectionCenteredImageComponent {
    @Input()
    image: String;
    @Input()
    header: string;
    constructor() {}
}
