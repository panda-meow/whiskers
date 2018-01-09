import { Component, Input } from '@angular/core';


@Component({
    selector: 'project-section-centered-quote',
    styleUrls: ['../../../project-detail/project-detail.component.scss'],
    templateUrl: './project-section-centered-quote.component.html',
})

export class ProjectSectionCenteredQuoteComponent {
    @Input()
    content: string
    constructor() {}
}