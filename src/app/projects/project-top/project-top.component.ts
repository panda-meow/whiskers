import {Component, ViewChild, ViewChildren, QueryList} from '@angular/core';
import {Router} from '@angular/router';

import {Project} from '../shared/project.model';

import {ProjectService} from '../shared/project.service';
import {AppConfig} from '../../config/app.config';
import { OnInit, OnChanges, AfterViewChecked, AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { ElementRef } from '@angular/core/src/linker/element_ref';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';


@Component({
  selector: 'app-project-top',
  templateUrl: './project-top.component.html',
  styleUrls: ['./project-top.component.scss']
})
export class ProjectTopComponent implements AfterViewInit {

  projects: Observable<Project[]>; 
  slides: string[] = ['slide-1.png', 'slide-2.png'];

  @ViewChildren('caption') captions: QueryList<ElementRef>; 
  @ViewChildren('thumbnail') thumbnails: QueryList<ElementRef>; 
  @ViewChildren('slide') _slides: QueryList<ElementRef>; 

  ngAfterViewInit() {
    load_top();
    register();
  }

  constructor(private projectService: ProjectService,
    private router: Router) {
    this.projects = this.projectService.getAllProjects().share();
  }

  imageLoaded() {
    console.log("Image Loaded");
  }

  getSlide(index: number): string {
    let temp = ['slide-1.png', 'slide-2.png'];
    return temp[index % temp.length];
  }

  transition(parent: QueryList<ElementRef>, _next: string, _current: string, _previous: string, forward: boolean = true) {
    let captions = parent.toArray();

    let current = captions.indexOf(captions.find((element) => {
      return element.nativeElement.className == _current;
    })); 

    let next = (current + 1) % captions.length;

    captions.forEach((element, i) => {
      if(i == current) {
        element.nativeElement.className = _previous;
      } else if(i == next) {
        element.nativeElement.className = _current;
      } else {
        element.nativeElement.style.display = element.nativeElement.className  == _previous ? "none" : "";
        element.nativeElement.className = _next;
      }
    });
  }

  next() {
    this.transition(this.captions, "hidden-next", "", "hidden-previous");
    this.transition(this.thumbnails, "hidden-next", "", "hidden-previous");
    this.transition(this._slides, "next-in", "current", "next-out");
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

/*window.onload = () => {
  load_top();
};*/