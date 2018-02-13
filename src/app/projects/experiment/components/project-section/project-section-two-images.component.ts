import { Component, Input } from '@angular/core';


@Component({
    selector: 'project-section-two-images',
    styleUrls: ['../../../project-detail/project-detail.component.scss'],
    templateUrl: './project-section-two-images.component.html',
})

export class ProjectSectionTwoImagesComponent {
  // images: string[];
  // @Input()
  // image: string;
    @Input()
    left: string;

    @Input()
    captionLT: string;

    @Input()
    right: string;

    @Input()
    captionRT: string;

    @Input()
    leftB: string;

    @Input()
    captionLB: string;

    @Input()
    rightB: string;

    @Input()
    captionRB: string;

    @Input()
    header: string;
    constructor() {}
}
