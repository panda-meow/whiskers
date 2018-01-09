import { Component, Input } from '@angular/core';
import { Project } from '../../../shared/project.model';


@Component({
    selector: 'project-callout',
    styleUrls: ['../../../project-detail/project-detail.component.scss'],
    templateUrl: './project-callout.component.html',
})

export class ProjectCalloutComponent {
    @Input()
    projects: Project[]
    constructor() {}

    headerURL(project: Project): string {
        return Project.headerURL(project);
    }

    thumbnailURL(project: Project): string {
        return Project.thumbnailURL(project);
    }
}