import { Component } from '@angular/core';
import {Project} from '../shared/project.model';
import {ProjectSection} from '../shared/project-section.model';
import {ProjectService} from '../shared/project.service';
import {ActivatedRoute} from '@angular/router';


@Component({
    selector: 'experiment',
    styleUrls: ['../project-detail/project-detail.component.scss'],
    templateUrl: './experiment.component.html',
})

export class ExperimentComponent {
    project: Project;
    related: Project[];
    sections: any[] = [
    ];

  constructor(private projectService: ProjectService,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe((params: any) => {
      if (params['id']) {
        this.projectService.getProjectById(params['id']).subscribe((project: Project) => {
          this.project = project;
          console.log('this is the project:' + project);
        });

        this.projectService.getAllProjects().subscribe((projects: Project[]) => {
          this.related = projects.filter(function(project) { return project.id != params['id']; }).slice(0, 3);
        });
      }
    });
  }

  asset(name: string): string {
    return 'http://' + window.location.hostname + ':8080/projects/' + this.project.id + '/assets/' + name;
  }

  headerURL(project: Project): string {
    return Project.headerURL(project);
  }

  thumbnailURL(project: Project): string {
    return Project.thumbnailURL(project);
  }
}
