import { Component } from '@angular/core';
import {Project} from '../shared/project.model';
import {ProjectService} from '../shared/project.service';
import {ActivatedRoute} from '@angular/router';
import {ProjectSectionComponent} from './components/project-section/project-section.component';


@Component({
    selector: 'experiment',
    styleUrls: ['experiment.component.scss'],
    templateUrl: './experiment.component.html',
})

export class ExperimentComponent {
    sections: String[] = ["Foo", "Bar", "Panda", "Chelsea"];
}
