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
import { ImageCarouselComponent, ImageMirrorCarouselComponent } from '../project-home/project-home.component';


interface Slideable {
  isEnabled: boolean;
  index: number;

  moveOut(): void;
  moveIn(): void;
  wait(): void;
  clear(): void;
}

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
    selector: 'thumbnail-slide',
    template: ``
})

export class ThumbnailSlideComponent implements AfterContentInit, Slideable {

  @HostBinding('class.hidden-next') hiddenNext = true;
  @HostBinding('class.hidden-previous') hiddenPrevious = false;
  @HostBinding('style.display') display = '';

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
    this.display = this.hiddenPrevious ? 'none' : '';
    this.hiddenNext = true;
    this.hiddenPrevious = false;
  }

  clear(): void {
    this.hiddenNext = false;
    this.hiddenPrevious = false;
    this.display = '';
  }

    @Input()
    index: number;

    @Input()
    project: Project;

    ngAfterContentInit(): void {
      if (this.index == 0) {
        this.hiddenNext = false;
      }
    }

    constructor() {}
}

@Directive({
  selector: 'h4[caption]',
})
export class CaptionSlideDirective implements AfterContentInit, Slideable {

  @HostBinding('class.hidden-next') hiddenNext = true;
  @HostBinding('class.hidden-previous') hiddenPrevious = false;
  @HostBinding('style.display') display = '';

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
    this.display = this.hiddenPrevious ? 'none' : '';
    this.hiddenNext = true;
    this.hiddenPrevious = false;
  }

  clear(): void {
    this.hiddenNext = false;
    this.hiddenPrevious = false;
    this.display = '';
  }

  @Input()
  index: number;

  @Input()
  project: Project;

  ngAfterContentInit(): void {
    if (this.index == 0) {
      this.hiddenNext = false;
    }
  }

  constructor() {}
}


@Directive({
  selector: 'li[slide]',
})
export class HeroSlideDirective implements AfterContentInit, Slideable {

  @HostBinding('class.next-in') nextIn = false;
  @HostBinding('class.next-out') nextOut = false;
  @HostBinding('class.current') current = false;

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
    this.nextIn = false;
    this.nextOut = false;
    this.current = false;
  }

  @Input()
  index: number;

  ngAfterContentInit(): void {
    if (this.index == 0) {
      this.current = true;
    }
  }

  constructor() {
  }
}

@Component({
    selector: 'hero-caption',
    styleUrls: ['project-top-hero-caption.scss'],
    template: `
      <!--h5>{{slide.caption}}</h5-->
      <h3>{{slide.title}}</h3>
      <div class="news">
      <h5>{{slide.caption}}</h5>
        <!--span>Wire</span>
        <!--div class="list">
          <p *ngFor="let footer of slide.footers">{{footer}}</p>
        </div-->
      </div>
      <!-- START OLD >
            <h5>{{slide.caption}}</h5>
            <h3>{{slide.title}}</h3>
            <div class="news">
              <span>Wire</span>
              <div class="list">
                <p *ngFor="let footer of slide.footers">{{footer}}</p>
              </div>
            </div>
               < END OLD -->
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

  public images: String[] = [
    "http://i0.kym-cdn.com/entries/icons/facebook/000/011/365/GRUMPYCAT.jpg",
    "https://yt3.ggpht.com/wm5LCci89chQvQ0oeDl-QxDMwCFTu6v0YiSEytYinTbG-hU_iLP9Jqc6cC57SbNLGxIlOfAhsrfE7BG_HO8=s900-mo-c-c0xffffffff-rj-k-no",
    "http://r.ddmcdn.com/s_f/o_1/cx_462/cy_245/cw_1349/ch_1349/w_720/APL/uploads/2015/06/caturday-shutterstock_149320799.jpg",
    "http://www.catbreedslist.com/cat-wallpapers/Persian-kitten-grass-white-2560x1600.jpg",
    "https://www.factslides.com/imgs/black-cat.jpg"
  ]

  @ViewChild('mirrorSlider') slider;
  @ViewChild(HeroCaptionComponent) heroCaption;
  @ViewChildren('slice') slices: QueryList<ElementRef>;
  @ViewChildren(CaptionSlideDirective) captions;
  //@ViewChildren(ThumbnailSlideComponent) thumbnails;
  @ViewChildren(HeroSlideDirective) slides;
  @ViewChild(ImageCarouselComponent) carousel;
  @ViewChild(ImageMirrorCarouselComponent) mirror;

  private lastTransition: number;

  ngAfterViewInit() {
    this.updateWindow();
    console.log(this.heros);
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

    /*this.slices.forEach((element, i) => {
        let y = -(this.slider.nativeElement.offsetHeight / 10) * (i % 10);
        element.nativeElement.style.backgroundPosition = '50% ' + y + 'px';
    });*/
  }

  private _transition(list: QueryList<Slideable>, forward: boolean, post: (current, next) => void): number {
    let elements = list.toArray();

    let current = elements.find((element) => {
      return element.isEnabled;
    });

    let nextIndex = forward ? ((current.index + 1) % elements.length) : ((current.index - 1) < 0 ?
      (elements.length - 1) : (current.index - 1));

    let next = elements[nextIndex];

    elements.forEach((element) => {
      if (element == current) {
        element.moveOut();
      } else if (element == next) {
        element.moveIn();
      } else {
        element.wait();
      }
    });

    if (post != null) {
      post(current, next);
    }

    return nextIndex;
  }

  private transition(forward: boolean) {
    if (!this.isMoving) {
      this.lastTransition = Date.now();
      this.isMoving = true;

      if(forward) {
        this.carousel.previous();
        this.mirror.next();
      } else {
        this.carousel.next();
        this.mirror.previous();
      }

      //this._transition(this.thumbnails, forward, null);
      this._transition(this.captions, forward, null);
      /*let index = this._transition(this.slides, forward, (current, next) => {
        setTimeout(() => {
          current.clear();
          next.current = true;
        }, 1000);
      });

      this.heroCaption.slide = this._slides[index];*/

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

  previewURL(project: Project): string {
    return Project.previewURL(project);
  }

}
