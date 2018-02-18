import {Component, ViewChild, ViewChildren, QueryList, HostListener, Directive, EventEmitter, Input, HostBinding } from '@angular/core';
import {Router} from '@angular/router';

import {Project} from '../shared/project.model';

import {ProjectService} from '../shared/project.service';
import {AppConfig} from '../../config/app.config';
import { OnInit, OnChanges, AfterViewChecked, AfterViewInit, AfterContentInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { ElementRef } from '@angular/core/src/linker/element_ref';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/take';
import { DomSanitizer } from '@angular/platform-browser';
import { nextTick } from 'q';
import { ImageCarouselComponent, ImageSlide } from '../project-home/image-carousel.component';
import { ImageMirrorCarouselComponent } from '../project-home/image-mirror-carousel.component';
import { TextCarouselComponent } from '../project-home/text-carousel.component';


class Slide {
  image: String;
  title: String;
  caption: String;
  footers: String[];

  constructor(image: String, title: String, caption: String, footers: String[]) {
    this.image = image;
    this.title = title;
    this.caption = caption;
    this.footers = footers;
  }
}


@Component({
    selector: 'hero-caption',
    styleUrls: ['project-top-hero-caption.scss'],
    template: `
      <h3>{{slide.title}}</h3>
      <div class="news">
      <h5>{{slide.caption}}</h5>
      </div>
      <div class="icons">
        <span>
        <i class="fa fa-play"></i>
      </span>
        <span>
        <i class="fa fa-eye"></i>
      </span>
      </div>
    `
})

export class HeroCaptionComponent {

  @Input()
  slide: Slide;

  constructor() {}
}


@Component({
  selector: 'app-project-top',
  templateUrl: './project-top.component.html',
  styleUrls: ['./project-top.component.scss']
})
export class ProjectTopComponent implements AfterViewInit {


  CAROUSEL_AUTOPLAY_INTERVAL_MS = 5000;

  projects: Observable<Project[]>;
  _projects: Project[];
  featured: Observable<Project[]>;

  isMoving: Boolean = false;
  _slides: Slide[] = [
    new Slide('slide-1.png', 'Welcome', 'to my work portfolio', [
      'This is a footer and it needs to be long so I can test line wrapping',
      'and this is the other message']),
    new Slide('slide-2.png', 'It\'\s Time', 'to put on your party hat', [
      "I can't think of anything else to write",
      'hmmmm.....'
    ]),
    new Slide('slide-1.png', 'Welcome', 'to my work portfolio', [
      'This is a footer and it needs to be long so I can test line wrapping',
      'and this is the other message']),
    new Slide('slide-2.png', 'It\'\s Time', 'to put on your party hat', [
      "I can't think of anything else to write",
      'hmmmm.....'
    ]),
  ];

  get heros(): string[] { 
    return this._slides.map(slide => { return 'assets/heros/' + slide.image; });
  }

  get _thumbnails(): ImageSlide[] {
    return this._projects.map(project => { return new ImageSlide(this.thumbnailURL(project), "clear"); });
  }

  get _tiles(): ImageSlide[] {
    return [ 
      new ImageSlide("//:0", "rgb(75,160,75)"), 
      new ImageSlide("//:0", "rgb(16,121,232)"), 
      new ImageSlide("//:0", "red"), 
      new ImageSlide("//:0", "rgb(254,177,2)") 
    ];
  }

  @ViewChild('mirrorSlider') slider;
  @ViewChild(HeroCaptionComponent) heroCaption;
  @ViewChildren(ImageCarouselComponent) imageCarousels;
  @ViewChild(ImageMirrorCarouselComponent) mirror;
  @ViewChild(TextCarouselComponent) captions;

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
    this.projects.subscribe(projects => {
      this._projects = projects;
    })
    this.featured = this.projects.take(3);
    this.lastTransition = Date.now();
  }

  private checkTimer() {
    if ((Date.now() - this.lastTransition) > this.CAROUSEL_AUTOPLAY_INTERVAL_MS) {
      this.transition(true);
    }
  }

  public navigateCurrent() {
    this.navigateTo(this.captions.current);
  }

  public navigateTo(project: Project)  {
    if(project == null) {
      this.router.navigate(['/projects']);
    } else {
      this.router.navigate(['/projects/' + project.id]);
    }
  }

  private updateWindow() {
    let height = window.innerHeight - 300;
    if (height % 2 === 1) {
        height++;
    }
    this.slider.nativeElement.style.height = height + 'px';

    this.mirror.updateWindow();
  }

  private transition(forward: boolean) {

    var carouselReady = true;

    this.imageCarousels.forEach(carousel => { 
      if(!carousel.isReady) {
        carouselReady = false
      }
    });


    if (this.mirror.isReady && carouselReady && this.captions.isReady) {

      this.lastTransition = Date.now();

      if(forward) {
        this.imageCarousels.forEach(carousel => { carousel.next(); });
        this.mirror.next();
        this.captions.next();
      } else {
        this.imageCarousels.forEach(carousel => { carousel.previous(); });
        this.mirror.previous();
        this.captions.previous();
      }
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

  previewURL(project: Project): string {
    return Project.previewURL(project);
  }

}
