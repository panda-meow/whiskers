import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Project} from '../shared/project.model';

import {ProjectService} from '../shared/project.service';
import {AppConfig} from '../../config/app.config';

declare function load_top();
@Component({
  selector: 'app-project-top',
  templateUrl: './project-top.component.html',
  styleUrls: ['./project-top.component.scss']
})
export class ProjectTopComponent implements OnInit {

  projects: Project[] = null;
  slides: string[];

  /*ngOnInit() {
  load_top();

  }*/
  get thumbnails(): string[] {
    return this.projects == null ? [] : this.projects.map((project) => Project.headerURL(project));
  }


  canVote = false;

  constructor(private projectService: ProjectService,
    private router: Router) {
    this.canVote = this.projectService.checkIfUserCanVote();

    this.projectService.getAllProjects().subscribe((projects) => {
      this.projects = projects.sort((a, b) => {
        return a.name.localeCompare(b.name);
      }).slice(0, 2);

      let temp = ['slide-1.png', 'slide-2.png'];
      this.slides = this.projects.map((project, i) => temp[i % temp.length]);
      load_top();
    });
  }

  seeProjectDetails(project): void {
      this.router.navigate([AppConfig.routes.projects + '/' + project.id]);
  }

  headerURL(project: Project): string {
    return Project.headerURL(project);
  }

  thumbnailURL(project: Project): string {
    return Project.thumbnailURL(project);
  }


  /*like(project: Project): Promise<any> {
    return new Promise((resolve, reject) => {
      this.projectService.like(project).subscribe(() => {
        this.canVote = this.projectService.checkIfUserCanVote();
        resolve(true);
      }, (error) => {
        reject(error);
      });
    });
  }*/
}

// window.onload = () => {
//   load_top();
// };
