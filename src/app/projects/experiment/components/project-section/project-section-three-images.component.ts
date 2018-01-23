import { Component, Input } from '@angular/core';


@Component({
    selector: 'project-section-three-images',
    styleUrls: ['../../../project-detail/project-detail.component.scss'],
    templateUrl: './project-section-three-images.component.html',
})

export class ProjectSectionThreeImagesComponent {
    @Input()
    left: string;

    @Input()
    leftCaption: string;

    @Input()
    center: string;

    @Input()
    centerCaption: string;

    @Input()
    right: string;

    @Input()
    rightCaption: string;

    constructor() {}
}
