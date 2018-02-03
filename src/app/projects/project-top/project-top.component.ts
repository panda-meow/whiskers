import {Component, ViewChild, ViewChildren, QueryList} from '@angular/core';
import {Router} from '@angular/router';

import {Project} from '../shared/project.model';

import {ProjectService} from '../shared/project.service';
import {AppConfig} from '../../config/app.config';
import { OnInit, OnChanges, AfterViewChecked, AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { ElementRef } from '@angular/core/src/linker/element_ref';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';

declare function register();


@Component({
  selector: 'app-project-top',
  templateUrl: './project-top.component.html',
  styleUrls: ['./project-top.component.scss']
})
export class ProjectTopComponent implements AfterViewInit {

  projects: Observable<Project[]>; 
  slides: string[] = ['slide-1.png', 'slide-2.png'];
  isMoving: Boolean = false;

  @ViewChildren('caption') captions: QueryList<ElementRef>; 
  @ViewChildren('thumbnail') thumbnails: QueryList<ElementRef>; 
  @ViewChildren('slide') _slides: QueryList<ElementRef>; 

  ngAfterViewInit() {
    register();
    this._slides.toArray()[0].nativeElement.className = "current";
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

  transitionSlide(parent: QueryList<ElementRef>) {
    let captions = parent.toArray();

    let current = captions.indexOf(captions.find((element) => {
      return element.nativeElement.className == "current";
    })); 

    let next = (current + 1) % captions.length;

    captions.forEach((element, i) => {
      if(i == current) {
        element.nativeElement.classList.add("next-out");
      } else if(i == next) {
        element.nativeElement.classList.add("next-in");
      } 
    });
    
    setTimeout(()=> {
      let captions = parent.toArray();
      captions[current].nativeElement.className = "";
      captions[next].nativeElement.className = "current";
    }, 1000);
  }

  transition(parent: QueryList<ElementRef>) {
    let captions = parent.toArray();

    let current = captions.indexOf(captions.find((element) => {
      return element.nativeElement.className == "";
    })); 

    let next = (current + 1) % captions.length;

    captions.forEach((element, i) => {
      if(i == current) {
        element.nativeElement.className = "hidden-previous";
      } else if(i == next) {
        element.nativeElement.className = "";
      } else {
        element.nativeElement.style.display = element.nativeElement.className  == "hidden-previous" ? "none" : "";
        element.nativeElement.className = "hidden-next";
      }
    });
  }

  next() {
    if(!this.isMoving) {
      this.isMoving = true;

      this.transition(this.captions);
      this.transition(this.thumbnails);
      this.transitionSlide(this._slides);

      setTimeout(()=> {
        this.isMoving = false;
      }, 1500);
    }
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

}