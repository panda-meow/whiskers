import {Component, ViewChild, ViewChildren, QueryList, HostListener } from '@angular/core';
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
  isMoving: Boolean = false;

  @ViewChild('mirrorSlider') slider;
  @ViewChildren('slice') slices: QueryList<ElementRef>; 
  @ViewChildren('caption') captions: QueryList<ElementRef>; 
  @ViewChildren('thumbnail') thumbnails: QueryList<ElementRef>; 
  @ViewChildren('slide') _slides: QueryList<ElementRef>; 

  ngAfterViewInit() {
    this.updateWindow();
    this._slides.toArray()[0].nativeElement.className = "current";
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.updateWindow();
  }

  constructor(private projectService: ProjectService,
    private router: Router) {
    this.projects = this.projectService.getAllProjects().share();
  }

  updateWindow() {
    let height = window.innerHeight - 300;
    if(height%2 === 1) {
        height++;
    }
    this.slider.nativeElement.style.height = height + "px";

    this.slices.forEach((element, i) => {
        let y = -(this.slider.nativeElement.offsetHeight / 10) * (i % 10);
        element.nativeElement.style.backgroundPosition = "50% " + y + "px";
    });
  }

  getSlide(index: number): string {
    let temp = ['slide-1.png', 'slide-2.png'];
    return temp[index % temp.length];
  }

  transitionSlide(parent: QueryList<ElementRef>, forward: boolean) {
    let captions = parent.toArray();

    let current = captions.indexOf(captions.find((element) => {
      return element.nativeElement.className == "current";
    })); 

    let next = forward ? ((current + 1) % captions.length) : ((current - 1) < 0 ? (captions.length - 1) : (current - 1));

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

  transition(parent: QueryList<ElementRef>, forward: boolean) {
    let captions = parent.toArray();

    let current = captions.indexOf(captions.find((element) => {
      return element.nativeElement.className == "";
    })); 

    let next = forward ? ((current + 1) % captions.length) : ((current - 1) < 0 ? (captions.length - 1) : (current - 1));

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

  previous() {
    if(!this.isMoving) {
      this.isMoving = true;

      this.transition(this.captions, false);
      this.transition(this.thumbnails, false);
      this.transitionSlide(this._slides, true);

      setTimeout(()=> {
        this.isMoving = false;
      }, 1500);
    }
  }

  next() {
    if(!this.isMoving) {
      this.isMoving = true;

      this.transition(this.captions, true);
      this.transition(this.thumbnails, true);
      this.transitionSlide(this._slides, true);

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