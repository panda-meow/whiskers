import { Component, Input } from '@angular/core';


@Component({
    selector: 'project-section-b',
    styleUrls: ['../../../project-detail/project-detail.component.scss'],
    templateUrl: './project-section-b.component.html',
})

export class ProjectSectionComponentB {
    @Input()
    image: string 
    @Input()
    content: string 
    @Input()
    overview: string

    constructor() {}

    get paragraphs(): string[] {
        return this.content.trim().replace('\r\n','\n').split('\n\n');
    }

    get points(): [string, string][] {
        var blocks = this.overview.trim().replace('\r\n','\n').split('\n\n');

        return blocks.map(function(block) {
            let index = block.indexOf("\n");
            return [block.substring(0, index), block.substring(index + 1)] as [string, string];
        });
    }
}