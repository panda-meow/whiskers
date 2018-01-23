// ngModules
import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

// Modules
import { Project } from '../../../../shared/project.model';

@Component({
    selector: 'project-header',
    styleUrls: ['../../../../project-detail/project-detail.component.scss', './project-header.component.scss'],
    templateUrl: './project-header.component.html',
})

export class ProjectHeaderComponent {
    @Input()
    project: Project;
    constructor() {}

    headerURL(project: Project): string {
        return Project.headerURL(project);
    }

    thumbnailURL(project: Project): string {
        return Project.thumbnailURL(project);
    }
}
