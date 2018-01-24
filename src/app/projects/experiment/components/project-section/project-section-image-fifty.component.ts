import { Component, Input } from '@angular/core';


@Component({
    selector: 'project-section-image-fifty',
    styleUrls: ['../../../project-detail/project-detail.component.scss'],
    templateUrl: './project-section-image-fifty.component.html',
})

export class ProjectSectionImageFiftyComponent {
    @Input()
    image: String;
    constructor() {}
}
