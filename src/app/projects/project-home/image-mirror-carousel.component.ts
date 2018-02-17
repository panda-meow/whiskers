import { Component, ViewChild, Input, AfterContentInit, ElementRef, ViewChildren, QueryList, AfterViewInit } from "@angular/core";
import { transition, state, animate, style, trigger } from "@angular/animations";
import { Project } from "../shared/project.model";

@Component({
  selector: 'image-mirror-carousel',
  template: `
        <div class="cut slide"> 
          <span 
            *ngIf="imageA"
            (@slideState.done)="done(0)" 
            [@slideState]="states[0]"
            class="slide1"
            [ngStyle]="{'background-image': 'url(\' + imageA + \')'}" #slidea></span>
          <span 
            *ngIf="imageA"
            (@slideState.done)="done(0)" 
            [@slideState]="states[0]"
            class="slide2"
            [ngStyle]="{'background-image': 'url(\' + imageA + \')'}" #slidea></span>
          <span 
            *ngIf="imageA"
            (@slideState.done)="done(0)" 
            [@slideState]="states[0]"
            class="slide3"
            [ngStyle]="{'background-image': 'url(\' + imageA + \')'}" #slidea></span>
          <span 
            *ngIf="imageA"
            (@slideState.done)="done(0)" 
            [@slideState]="states[0]"
            class="slide4"
            [ngStyle]="{'background-image': 'url(\' + imageA + \')'}" #slidea></span>
          <span 
            *ngIf="imageA"
            (@slideState.done)="done(0)" 
            [@slideState]="states[0]"
            class="slide5"
            [ngStyle]="{'background-image': 'url(\' + imageA + \')'}" #slidea></span>
          <span 
            *ngIf="imageA"
            (@slideState.done)="done(0)" 
            [@slideState]="states[0]"
            class="slide6"
            [ngStyle]="{'background-image': 'url(\' + imageA + \')'}" #slidea></span>
          <span 
            *ngIf="imageA"
            (@slideState.done)="done(0)" 
            [@slideState]="states[0]"
            class="slide7"
            [ngStyle]="{'background-image': 'url(\' + imageA + \')'}" #slidea></span>
          <span 
            *ngIf="imageA"
            (@slideState.done)="done(0)" 
            [@slideState]="states[0]"
            class="slide8"
            [ngStyle]="{'background-image': 'url(\' + imageA + \')'}" #slidea></span>
          <span 
            *ngIf="imageA"
            (@slideState.done)="done(0)" 
            [@slideState]="states[0]"
            class="slide9"
            [ngStyle]="{'background-image': 'url(\' + imageA + \')'}" #slidea></span>
          <span 
            *ngIf="imageA"
            (@slideState.done)="done(0)" 
            [@slideState]="states[0]"
            class="slide10"
            [ngStyle]="{'background-image': 'url(\' + imageA + \')'}" #slidea></span>
        </div>
        <div class="cut slide">
        <span 
          *ngIf="imageB"
          (@slideState.done)="done(1)" 
          [@slideState]="states[1]"
          class="slide1"
          [ngStyle]="{'background-image': 'url(\' + imageB + \')'}" #slideb></span>
        <span 
          *ngIf="imageB"
          (@slideState.done)="done(1)" 
          [@slideState]="states[1]"
          class="slide2"
          [ngStyle]="{'background-image': 'url(\' + imageB + \')'}" #slideb></span>
        <span 
          *ngIf="imageB"
          (@slideState.done)="done(1)" 
          [@slideState]="states[1]"
          class="slide3"
          [ngStyle]="{'background-image': 'url(\' + imageB + \')'}" #slideb></span>
        <span 
          *ngIf="imageB"
          (@slideState.done)="done(1)" 
          [@slideState]="states[1]"
          class="slide4"
          [ngStyle]="{'background-image': 'url(\' + imageB + \')'}" #slideb></span>
        <span 
          *ngIf="imageB"
          (@slideState.done)="done(1)" 
          [@slideState]="states[1]"
          class="slide5"
          [ngStyle]="{'background-image': 'url(\' + imageB + \')'}" #slideb></span>
        <span 
          *ngIf="imageB"
          (@slideState.done)="done(1)" 
          [@slideState]="states[1]"
          class="slide6"
          [ngStyle]="{'background-image': 'url(\' + imageB + \')'}" #slideb></span>
        <span 
          *ngIf="imageB"
          (@slideState.done)="done(1)" 
          [@slideState]="states[1]"
          class="slide7"
          [ngStyle]="{'background-image': 'url(\' + imageB + \')'}" #slideb></span>
        <span 
          *ngIf="imageB"
          (@slideState.done)="done(1)" 
          [@slideState]="states[1]"
          class="slide8"
          [ngStyle]="{'background-image': 'url(\' + imageB + \')'}" #slideb></span>
        <span 
          *ngIf="imageB"
          (@slideState.done)="done(1)" 
          [@slideState]="states[1]"
          class="slide9"
          [ngStyle]="{'background-image': 'url(\' + imageB + \')'}" #slideb></span>
        <span 
          *ngIf="imageB"
          (@slideState.done)="done(1)" 
          [@slideState]="states[1]"
          class="slide10"
          [ngStyle]="{'background-image': 'url(\' + imageB + \')'}" #slideb></span>
      </div>
      <div class="cut slide">
      <span 
        *ngIf="imageC"
        (@slideState.done)="done(2)" 
        [@slideState]="states[2]"
        class="slide1"
        [ngStyle]="{'background-image': 'url(\' + imageC + \')'}" #slidec></span>
      <span 
        *ngIf="imageC"
        (@slideState.done)="done(2)" 
        [@slideState]="states[2]"
        class="slide2"
        [ngStyle]="{'background-image': 'url(\' + imageC + \')'}" #slidec></span>
      <span 
        *ngIf="imageC"
        (@slideState.done)="done(2)" 
        [@slideState]="states[2]"
        class="slide3"
        [ngStyle]="{'background-image': 'url(\' + imageC + \')'}" #slidec></span>
      <span 
        *ngIf="imageC"
        (@slideState.done)="done(2)" 
        [@slideState]="states[2]"
        class="slide4"
        [ngStyle]="{'background-image': 'url(\' + imageC + \')'}" #slidec></span>
      <span 
        *ngIf="imageC"
        (@slideState.done)="done(2)" 
        [@slideState]="states[2]"
        class="slide5"
        [ngStyle]="{'background-image': 'url(\' + imageC + \')'}" #slidec></span>
      <span 
        *ngIf="imageC"
        (@slideState.done)="done(2)" 
        [@slideState]="states[2]"
        class="slide6"
        [ngStyle]="{'background-image': 'url(\' + imageC + \')'}" #slidec></span>
      <span 
        *ngIf="imageC"
        (@slideState.done)="done(2)" 
        [@slideState]="states[2]"
        class="slide7"
        [ngStyle]="{'background-image': 'url(\' + imageC + \')'}" #slidec></span>
      <span 
        *ngIf="imageC"
        (@slideState.done)="done(2)" 
        [@slideState]="states[2]"
        class="slide8"
        [ngStyle]="{'background-image': 'url(\' + imageC + \')'}" #slidec></span>
      <span 
        *ngIf="imageC"
        (@slideState.done)="done(2)" 
        [@slideState]="states[2]"
        class="slide9"
        [ngStyle]="{'background-image': 'url(\' + imageC + \')'}" #slidec></span>
      <span 
        *ngIf="imageC"
        (@slideState.done)="done(2)" 
      [@slideState]="states[2]"
        class="slide10"
        [ngStyle]="{'background-image': 'url(\' + imageC + \')'}" #slidec></span>
    </div>
  `,
  styles: [`
    :host {
      position: relative;
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
    }
    span {
      position: absolute;
      display: block;
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
    }

    .noAnimate {
      transition-delay: .02s;
    }
      .slide1 {
        top: 0; transition-delay: .02s;
      }
      .slide2 {
        top: 10%; transition-delay: .04s;
      }
      .slide3 {
        top: 20%; transition-delay: .06s;
      }
      .slide4 {
        top: 30%; transition-delay: .08s;
      }
      .slide5 {
        top: 40%; transition-delay: .02s;
      }
      .slide6 {
        top: 50%; transition-delay: .04s;
      }
      .slide7 {
        top: 60%; transition-delay: .06s;
      }
      .slide8 {
        top: 70%; transition-delay: .04s;
      }
      .slide9 {
        top: 80%; transition-delay: .02s;
      }
      .slide10 {
        top: 90%; transition-delay: .0s;
      }
  `],
  animations: [
    trigger('slideState', [
      state('current', style({
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
      /*transition('current => next', animate('400ms ease-in')),
      transition('current => previous', animate('400ms ease-in')),
      transition('previous => current', animate('400ms ease-in')),
      transition('next => current', animate('400ms ease-in')),*/
    ])
  ]
})

export class ImageMirrorCarouselComponent implements AfterContentInit, AfterViewInit {

  @ViewChildren("slidea") slideA: QueryList<ElementRef>;
  @ViewChildren("slideb") slideB: QueryList<ElementRef>;
  @ViewChildren("slidec") slideC: QueryList<ElementRef>;

  public imageA: String
  public imageB: String
  public imageC: String

  @Input()
  images: string[]

  public states: String[] = ["previous", "current", "next"];

  private animationLevel: number = 0; 

  private index: number = 0 

  public get isReady(): boolean {
    return this.animationLevel == 0;
  }

  ngAfterContentInit(): void {
    this.imageA = this.images[0];
    this.imageB = this.images[1];
    this.imageC = this.images[2];
  }

  ngAfterViewInit(): void {
    this.updateWindow();
  }

  constructor(private slider:ElementRef) {
  }

  public updateWindow() {
    this.slideA.toArray().forEach((element, i) => {
        let y = -(this.slider.nativeElement.offsetHeight / 10) * (i % 10);
        element.nativeElement.style.backgroundPosition = '50% ' + y + 'px';
        element.nativeElement.style.display = "block";
        element.nativeElement.style.height = "10%";
    });

    this.slideB.toArray().forEach((element, i) => {
        let y = -(this.slider.nativeElement.offsetHeight / 10) * (i % 10);
        element.nativeElement.style.backgroundPosition = '50% ' + y + 'px';
        element.nativeElement.style.display = "block";
        element.nativeElement.style.height = "10%";
    });
    this.slideC.toArray().forEach((element, i) => {
        let y = -(this.slider.nativeElement.offsetHeight / 10) * (i % 10);
        element.nativeElement.style.backgroundPosition = '50% ' + y + 'px';
        element.nativeElement.style.display = "block";
        element.nativeElement.style.height = "10%";
    });
  }

  public done(index: number) {
    if(this.animationLevel > 0) {
      this.animationLevel -= 1;
    }
  }

  public previous() {
    if(this.animationLevel == 0) {
      this.animationLevel = 30;
      this.setup(false);
    } 
  }

  public next() {
    if(this.animationLevel == 0) {
      this.animationLevel = 30;
      this.setup(true);
    } 
  }

  private previousIndex(): number {
    return this.states.indexOf("previous")
  }

  private nextIndex(): number {
    return this.states.indexOf("next")
  }

  private set(index: number, image: string) {
      switch(index) {
        case 0:
          this.imageA = image;
          break;
        case 1:
          this.imageB = image;
          break;
        case 2:
          this.imageC = image;
          break;
      }
  }

  private hidden(index: number, hidden: boolean) {
      switch(index) {
        case 0:
          this.slideA.first.nativeElement.parentElement.style.visibility = hidden ? "hidden" : "visible";
          break;
        case 1:
          this.slideB.first.nativeElement.parentElement.style.visibility = hidden ? "hidden" : "visible";
          break;
        case 2:
          this.slideC.first.nativeElement.parentElement.style.visibility = hidden ? "hidden" : "visible";
          break;
      }
  }

  private setup(forward: boolean) {

    if(forward) {

      this.index = (this.index + 1) % this.images.length;

      this.hidden(this.nextIndex(), false);
      this.set(this.nextIndex(), this.images[this.index]);
      this.hidden(this.previousIndex(), true);

      let last = this.states[this.states.length - 1];
      for(let i = this.states.length - 1; i > 0; i-=1) {
        this.states[i] = this.states[i - 1];
      }
      this.states[0] = last;

    } else {
      this.index = (this.index - 1) < 0 ? (this.images.length - 1) : (this.index - 1);

      this.hidden(this.previousIndex(), false);
      this.set(this.previousIndex(), this.images[this.index]);
      this.hidden(this.nextIndex(), true);

      let first = this.states[0];
      for(let i = 1; i < this.states.length; i++) {
        this.states[i - 1] = this.states[i];
      }
      this.states[this.states.length - 1] = first;
    }
  }
}