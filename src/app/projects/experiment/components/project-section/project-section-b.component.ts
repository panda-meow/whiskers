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
    items: [[string, string]]

    //paragraphs: [string];

    constructor() {
        //this.paragraphs = ["a", "b"]; //[this.content, this.image];
    }

    get paragraphs(): string[] {
        return this.content.trim().replace('\r\n','\n').split('\n\n').map(function(paragraph) {
            /*if (paragraph.startsWith('~')) {
                return '<span class="drop-cap">' + paragraph.charAt(1) + '</span>' + paragraph.substring(2);
            } else {*/
                return paragraph;
            //}
        });
    }
}