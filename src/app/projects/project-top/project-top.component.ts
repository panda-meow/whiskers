import {Component} from '@angular/core';

import {Project} from '../shared/project.model';

import {ProjectService} from '../shared/project.service';
import {AppConfig} from '../../config/app.config';

@Component({
  selector: 'app-project-top',
  templateUrl: './project-top.component.html',
  styleUrls: ['./project-top.component.scss']
})
export class ProjectTopComponent {

  projects: Project[] = null;
  canVote = false;

  constructor(private projectService: ProjectService) {
    this.canVote = this.projectService.checkIfUserCanVote();

    this.projectService.getAllProjects().subscribe((projects) => {
      this.projects = projects.sort((a, b) => {
        return b.likes - a.likes;
      }).slice(0, AppConfig.topProjectsLimit);
    });
  }

  like(project: Project): Promise<any> {
    return new Promise((resolve, reject) => {
      this.projectService.like(project).subscribe(() => {
        this.canVote = this.projectService.checkIfUserCanVote();
        resolve(true);
      }, (error) => {
        reject(error);
      });
    });
  }
}
