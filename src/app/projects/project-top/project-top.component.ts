import {Component, ViewChild, ViewChildren, QueryList, HostListener, Directive, EventEmitter, Input, HostBinding } from '@angular/core';
import {Router} from '@angular/router';

import {Project} from '../shared/project.model';

import {ProjectService} from '../shared/project.service';
import {AppConfig} from '../../config/app.config';
import { OnInit, OnChanges, AfterViewChecked, AfterViewInit, AfterContentInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { ElementRef } from '@angular/core/src/linker/element_ref';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import { DomSanitizer } from '@angular/platform-browser';
import { nextTick } from 'q';


interface Slideable {
  isEnabled: boolean;
  index: number;
    
  moveOut(): void;
  moveIn(): void;
  wait(): void;
  clear(): void;
}


@Component({
    selector: 'thumbnail-slide',
    template: ``
})

export class ThumbnailSlideComponent implements AfterContentInit, Slideable {

  @HostBinding('class.hidden-next') hiddenNext: boolean = true;
  @HostBinding('class.hidden-previous') hiddenPrevious: boolean = false;
  @HostBinding('style.display') display: string = "";

  get isEnabled(): boolean {
    return this.hiddenNext == false && this.hiddenPrevious == false; // A little hacky :(
  }

  moveOut(): void {
    this.hiddenNext = false;
    this.hiddenPrevious = true;
  }

  moveIn(): void {
    this.hiddenNext = false;
    this.hiddenPrevious = false;
  }

  wait(): void {
    this.display = this.hiddenPrevious ? "none" : "";
    this.hiddenNext = true;
    this.hiddenPrevious = false;
  }

  clear(): void {
    this.hiddenNext = false;
    this.hiddenPrevious = false;
    this.display = "";
  }

    @Input()
    index: number

    @Input()
    project: Project

    ngAfterContentInit(): void {
      if(this.index == 0) {
        this.hiddenNext = false;
      }
    }

    constructor() {}
}

@Directive({
  selector: 'h4[caption]',
})
export class CaptionSlideDirective implements AfterContentInit, Slideable {

  @HostBinding('class.hidden-next') hiddenNext: boolean = true;
  @HostBinding('class.hidden-previous') hiddenPrevious: boolean = false;
  @HostBinding('style.display') display: string = "";

  get isEnabled(): boolean {
    return this.hiddenNext == false && this.hiddenPrevious == false; // A little hacky :(
  }

  moveOut(): void {
    this.hiddenNext = false;
    this.hiddenPrevious = true;
  }

  moveIn(): void {
    this.hiddenNext = false;
    this.hiddenPrevious = false;
  }

  wait(): void {
    this.display = this.hiddenPrevious ? "none" : "";
    this.hiddenNext = true;
    this.hiddenPrevious = false;
  }

  clear(): void {
    this.hiddenNext = false;
    this.hiddenPrevious = false;
    this.display = "";
  }

  @Input()
  index: number

  @Input()
  project: Project

  ngAfterContentInit(): void {
    if(this.index == 0) {
      this.hiddenNext = false;
    }
  }

  constructor() {}
}


@Directive({
  selector: 'li[slide]',
})
export class HeroSlideDirective implements AfterContentInit, Slideable {

  @HostBinding('class.next-in') nextIn: boolean = false;
  @HostBinding('class.next-out') nextOut: boolean = false;
  @HostBinding('class.current') current: boolean = false;

  get isEnabled(): boolean {
    return this.current;
  }

  moveOut(): void {
    this.nextIn = false;
    this.nextOut = true;
  }

  moveIn(): void {
    this.nextIn = true;
    this.nextOut = false;
  }

  wait(): void {
  }

  clear(): void {
    this.nextIn = false
    this.nextOut = false
    this.current = false
  }

  @Input()
  index: number

  ngAfterContentInit(): void {
    if(this.index == 0) {
      this.current = true;
    }
  }

  constructor() {
    console.log('slides');
  }
}


@Component({
  selector: 'app-project-top',
  templateUrl: './project-top.component.html',
  styleUrls: ['./project-top.component.scss']
})
export class ProjectTopComponent implements AfterViewInit {


  CAROUSEL_AUTOPLAY_INTERVAL_MS = 5000;

  projects: Observable<Project[]>;
  isMoving: Boolean = false;
  _slides = ['slide-1.png', 'slide-2.png'];

  @ViewChild('mirrorSlider') slider;
  @ViewChildren('slice') slices: QueryList<ElementRef>;
  @ViewChildren(CaptionSlideDirective) captions;
  @ViewChildren(ThumbnailSlideComponent) thumbnails;
  @ViewChildren(HeroSlideDirective) slides;

  private lastTransition: number;

  ngAfterViewInit() {
    this.updateWindow();
    setInterval(() => this.checkTimer(), 1000);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.updateWindow();
  }

  constructor(private projectService: ProjectService,
    private router: Router) {
    this.projects = this.projectService.getAllProjects().share();
    this.lastTransition = Date.now();
  }

  private checkTimer() {
    if((Date.now() - this.lastTransition) > this.CAROUSEL_AUTOPLAY_INTERVAL_MS) {
      this.transition(true);
    }
  }

  private updateWindow() {
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

  private _transition(list: QueryList<Slideable>, forward: boolean, post: (current, next) => void) {
    let elements = list.toArray();

    let current = elements.find((element) => {
      return element.isEnabled;
    });

    let nextIndex = forward ? ((current.index + 1) % elements.length) : ((current.index - 1) < 0 ? 
      (elements.length - 1) : (current.index - 1));

    let next = elements[nextIndex];

    elements.forEach((element) => {
      if(element == current) {
        element.moveOut();
      } else if(element == next) {
        element.moveIn();
      } else {
        element.wait();
      } 
    });

    if(post != null) {
      post(current, next);
    }
  }

  private transition(forward: boolean) {
    if (!this.isMoving) {
      this.lastTransition = Date.now();
      this.isMoving = true;

      this._transition(this.thumbnails, forward, null);
      this._transition(this.captions, forward, null);
      this._transition(this.slides, forward, (current, next) => {
        setTimeout(() => {
          current.clear();
          next.current = true;
        }, 1000);
      });

      setTimeout(() => {
        this.isMoving = false;
      }, 1500);
    }
  }

  previous() {
    this.transition(false);
  }

  next() {
    this.transition(true);
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
