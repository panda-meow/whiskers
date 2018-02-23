import { Component, Input } from '@angular/core';


@Component({
    selector: 'project-section-image-full',
    styleUrls: ['../../../project-detail/project-detail.component.scss'],
    templateUrl: './project-section-image-full.component.html',
})

export class ProjectSectionImageFullComponent {
    @Input()
    image: String;
    @Input()
    header: string;
    constructor() {}

    public get isVideo(): boolean {
      return this.image.endsWith('.mp4');
    }
}
