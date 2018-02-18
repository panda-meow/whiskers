import { Component, AfterViewInit, ViewChild, OnChanges, SimpleChanges, Input, ViewChildren, AfterContentInit, ContentChildren, ElementRef, QueryList } from "@angular/core";
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

import { ProjectService } from "../shared/project.service";
import { Router } from "@angular/router";
import { Project } from "../shared/project.model";
import { element } from "protractor";
import { ImageMirrorCarouselComponent } from "./image-mirror-carousel.component";
import { ImageCarouselComponent } from "./image-carousel.component";

@Component({
  selector: 'carousel',
  template: `
    <div class="slide"
      (@slideState.done)="done(0)" 
      [@slideState]="states[0]" #slidea>
      </div>
    <div class="slide"
      (@slideState.done)="done(1)" 
      [@slideState]="states[1]" #slideb></div>
  `,
  styles: [`
    :host {
      display: block;
      overflow: hidden;
      font-size: 18px;
    }
    .slide {
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
    }
    .cut {
      overflow: hidden;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      span {
        position: absolute;
        left: 0;
        width: 100%;
        height: 10%;
        overflow: hidden;
        // -webkit-transform: translateX(100%);
        transform: translateX(100%);
        // transition: -webkit-transform 1s cubic-bezier(0.23, 0.23, 0, 0.99);
        transition: transform 1s cubic-bezier(0.23, 0.23, 0, 0.99);
        // transition: transform 1s cubic-bezier(0.23, 0.23, 0, 0.99), -webkit-transform 1s cubic-bezier(0.23, 0.23, 0, 0.99);
        background-size: cover;
        background-repeat: no-repeat;
        &:nth-child(1) {
          top: 0;
          transition-delay: .02s;
        }
        &:nth-child(2) {
          top: 10%;
          transition-delay: .04s;
        }
        &:nth-child(3) {
          top: 20%;
          transition-delay: .06s;
        }
        &:nth-child(4) {
          top: 30%;
          transition-delay: .08s;
        }
        &:nth-child(5) {
          top: 40%;
          transition-delay: .02s;
        }
        &:nth-child(6) {
          top: 50%;
          transition-delay: .04s;
        }
        &:nth-child(7) {
          top: 60%;
          transition-delay: .06s;
        }
        &:nth-child(8) {
          top: 70%;
          transition-delay: .04s;
        }
        &:nth-child(9) {
          top: 80%;
          transition-delay: .02s;
        }
        &:nth-child(10) {
          top: 90%;
          transition-delay: .0s;
        }
      }
    }
  `],
  animations: [
    trigger('slideState', [
      state('current',   style({
        zIndex: '2',
        transform: 'translateX(0)'
      })),
      state('next', style({
        zIndex: '1',
        transform: 'translateX(100%)'
      })),
      state('previous', style({
        zIndex: '1',
        transform: 'translateX(-100%)'
      })),
      transition('previous => current', animate('400ms ease-in')),
      transition('current => next', animate('400ms ease-in')),
      transition('current => previous', animate('400ms ease-in')),
      transition('next => current', animate('400ms ease-in')),
    ])
  ]
})

export class CarouselComponent implements AfterContentInit {

  @ContentChildren("slide") slides; 
  @ViewChild("slidea") slideA;
  @ViewChild("slideb") slideB;

  public states: String[] = ["current", "next"];

  private animationLevel: number = 0; 

  private index: number = 0 

  ngAfterContentInit(): void {
    this.slideA.nativeElement.appendChild(this.slides.toArray()[0].nativeElement);
    this.slideB.nativeElement.appendChild(this.slides.toArray()[1].nativeElement);
  }

  constructor() {
  }

  public done(index: number) {
    if(index == 0) {
      this.doneA();
    } else {
      this.doneB();
    }
  }

  public doneA() {
    if(this.animationLevel > 0) {
      this.animationLevel -= 1;
      if(this.animationLevel == 1) {
        this.run();
      }
    }
  }

  public doneB() {
    if(this.animationLevel > 0) {
      this.animationLevel -= 1;
      if(this.animationLevel == 1) {
        this.run();
      }
    }
  }

  public previous() {
    if(this.animationLevel == 0) {
      this.animationLevel = 1;
      this.setup(false);
    } 
  }

  public next() {
    if(this.animationLevel == 0) {
      this.animationLevel = 1;
      this.setup(true);
    } 
  }

  private run() {
    if(this.states[0] == 'current') {
      this.states[0] = this.states[1] == 'previous' ? 'next' : 'previous';
      this.states[1] = 'current';
    } else {
      this.states[1] = this.states[0] == 'previous' ? 'next' : 'previous';
      this.states[0] = 'current';
    }
  }

  private setup(forward: boolean) {

    let slides = this.slides.toArray();
    this.index = forward ? ((this.index + 1) % slides.length) : ((this.index - 1) < 0 ?
      (slides.length - 1) : (this.index - 1));

    if(this.states[0] == 'current') {
      let last = this.states[1];
      this.states[1] = forward ? 'previous' : 'next';

      this.slideB.nativeElement.innerHTML = '';
      this.slideB.nativeElement.appendChild(slides[this.index].nativeElement);

      if(last == this.states[1]) {
        this.doneB();
      }
    } else {
      let last = this.states[0];
      this.states[0] = forward ? 'previous' : 'next';

      this.slideA.nativeElement.innerHTML = '';
      this.slideA.nativeElement.appendChild(slides[this.index].nativeElement);

      if(last == this.states[0]) {
        this.doneA();
      }
    }
  }

}

@Component({
  selector: 'app-project-home',
  templateUrl: './project-home.component.html',
  styleUrls: ['./project-home.component.scss']
})

export class ProjectHomeComponent implements AfterViewInit, OnChanges {

  @ViewChild(ImageCarouselComponent) carousel;

  public images: String[] = [
    "http://5dimensions.se/wp-content/uploads/2016/04/red-number-0.jpg",
    "http://5dimensions.se/wp-content/uploads/2016/04/red-number-1.jpg",
    "http://5dimensions.se/wp-content/uploads/2016/04/red-number-2.jpg",
    "http://5dimensions.se/wp-content/uploads/2016/04/red-number-3.jpg",
    "http://5dimensions.se/wp-content/uploads/2016/04/red-number-4.jpg"

    /*"https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Classic_alphabet_numbers_0_at_coloring-pages-for-kids-boys-dotcom.svg/220px-Classic_alphabet_numbers_0_at_coloring-pages-for-kids-boys-dotcom.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Classic_alphabet_numbers_1_at_coloring-pages-for-kids-boys-dotcom.svg/220px-Classic_alphabet_numbers_1_at_coloring-pages-for-kids-boys-dotcom.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Classic_alphabet_numbers_2_at_coloring-pages-for-kids-boys-dotcom.svg/220px-Classic_alphabet_numbers_2_at_coloring-pages-for-kids-boys-dotcom.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Classic_alphabet_numbers_3_at_coloring-pages-for-kids-boys-dotcom.svg/220px-Classic_alphabet_numbers_3_at_coloring-pages-for-kids-boys-dotcom.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Classic_alphabet_numbers_4_at_coloring-pages-for-kids-boys-dotcom.svg/220px-Classic_alphabet_numbers_4_at_coloring-pages-for-kids-boys-dotcom.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Classic_alphabet_numbers_5_at_coloring-pages-for-kids-boys-dotcom.svg/220px-Classic_alphabet_numbers_5_at_coloring-pages-for-kids-boys-dotcom.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Classic_alphabet_numbers_6_at_coloring-pages-for-kids-boys-dotcom.svg/220px-Classic_alphabet_numbers_6_at_coloring-pages-for-kids-boys-dotcom.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Classic_alphabet_numbers_7_at_coloring-pages-for-kids-boys-dotcom.svg/220px-Classic_alphabet_numbers_7_at_coloring-pages-for-kids-boys-dotcom.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Classic_alphabet_numbers_8_at_coloring-pages-for-kids-boys-dotcom.svg/220px-Classic_alphabet_numbers_8_at_coloring-pages-for-kids-boys-dotcom.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Classic_alphabet_numbers_9_at_coloring-pages-for-kids-boys-dotcom.svg/220px-Classic_alphabet_numbers_9_at_coloring-pages-for-kids-boys-dotcom.svg.png"*/
  ]

  /*public images: String[] = [
    "http://i0.kym-cdn.com/entries/icons/facebook/000/011/365/GRUMPYCAT.jpg",
    "https://yt3.ggpht.com/wm5LCci89chQvQ0oeDl-QxDMwCFTu6v0YiSEytYinTbG-hU_iLP9Jqc6cC57SbNLGxIlOfAhsrfE7BG_HO8=s900-mo-c-c0xffffffff-rj-k-no",
    "http://r.ddmcdn.com/s_f/o_1/cx_462/cy_245/cw_1349/ch_1349/w_720/APL/uploads/2015/06/caturday-shutterstock_149320799.jpg",
    "http://www.catbreedslist.com/cat-wallpapers/Persian-kitten-grass-white-2560x1600.jpg",
    "https://www.factslides.com/imgs/black-cat.jpg"
  ]*/

  ngAfterViewInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Ok');
  }

  public index: number = 0

  constructor(private projectService: ProjectService,
    private router: Router) {
  }

  public previous() {
    this.carousel.previous();
    this.index -= 1;
  }

  public next() {
    this.carousel.next();
    this.index += 1;
  }
}