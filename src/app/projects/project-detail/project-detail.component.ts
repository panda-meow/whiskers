import {Component} from '@angular/core';
import {Project} from '../shared/project.model';
import {ProjectService} from '../shared/project.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})

export class ProjectDetailComponent {

  project: Project;
  canVote: boolean;

  constructor(private projectService: ProjectService,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe((params: any) => {
      if (params['id']) {
        this.projectService.getProjectById(params['id']).subscribe((project: Project) => {
          this.project = project;
          console.log('this is the project:' + project);

        });
      }
    });
  }

  /*like(project: Project) {
    return new Promise((resolve, reject) => {
      this.projectService.like(project).subscribe(() => {
        this.canVote = this.projectService.checkIfUserCanVote();
        resolve(true);
      }, (error) => {
        reject(error);
      });
    });
  }*/

  headerURL(project: Project): string {
    return Project.headerURL(project);
  }

  thumbnailURL(project: Project): string {
    return Project.thumbnailURL(project);
  }
}
