import { Component, ViewChild, Input, AfterContentInit, ElementRef } from "@angular/core";
import { transition, state, animate, style, trigger } from "@angular/animations";
import { Project } from "../shared/project.model";

@Component({
  selector: 'image-carousel',
  template: `
    <img class="slide"
      (@slideState.done)="done(0)" 
      [@slideState]="states[0]" [src]="imageA" #slidea>
    <img class="slide"
      (@slideState.done)="done(1)" 
      [@slideState]="states[1]" [src]="imageB" #slideb>
    <img class="slide"
      (@slideState.done)="done(2)" 
      [@slideState]="states[2]" [src]="imageC" #slidec>
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
      /*max-width: 100%;*/
      /*max-height: 100%;*/
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
    }
  `],
  animations: [
    trigger('slideState', [
      state('current',   style({
        zIndex: '2',
        transform: 'translateY(0) translateX(0)'
      })),
      state('top', style({
        zIndex: '1',
        transform: 'translateY(-100%)'
      })),
      state('bottom', style({
        zIndex: '1',
        transform: 'translateY(100%)'
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
      transition('top => current', animate('400ms ease-in')),
      transition('current => next', animate('400ms ease-in')),
      transition('current => bottom', animate('400ms ease-in')),
      transition('current => previous', animate('400ms ease-in')),
      transition('current => top', animate('400ms ease-in')),
      transition('next => current', animate('400ms ease-in')),
      transition('bottom => current', animate('400ms ease-in')),
    ])
  ]
})

export class ImageCarouselComponent implements AfterContentInit {

  @ViewChild("slidea") slideA;
  @ViewChild("slideb") slideB;
  @ViewChild("slidec") slideC;

  public imageA: String
  public imageB: String
  public imageC: String

  @Input()
  images: string[]

  @Input()
  vertical: boolean

  public states: String[] = ["current", "next", "previous"];
  private animationLevel: number = 0; 

  private index: number = 0 

  public get nextState(): String {
    return this.vertical ? "bottom" : "next";
  }

  public get previousState(): String {
    return this.vertical ? "top" : "previous";
  }

  public get isReady(): boolean {
    return this.animationLevel == 0;
  }

  public get current(): String {
    return this.images[this.index];
  }

  ngAfterContentInit(): void {
    if(this.vertical) {
      this.states = ["current", this.nextState, this.previousState];
    }
    this.imageA = this.images[0];
    this.imageB = this.images[1];
    this.imageC = this.images[2];
  }

  ngAfterViewInit(): void {
  }

  constructor(private slider:ElementRef) {
  }

  public done(index: number) {
    if(this.animationLevel > 0) {
      this.animationLevel -= 1;
    }
  }

  public previous() {
    if(this.animationLevel == 0) {
      this.animationLevel = 3;
      this.setup(false);
    } 
  }

  public next() {
    if(this.animationLevel == 0) {
      this.animationLevel = 3;
      this.setup(true);
    } 
  }

  private previousIndex(): number {
    return this.states.indexOf(this.previousState);
  }

  private nextIndex(): number {
    return this.states.indexOf(this.nextState);
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
          this.slideA.nativeElement.style.visibility = hidden ? "hidden" : "visible";
          break;
        case 1:
          this.slideB.nativeElement.style.visibility = hidden ? "hidden" : "visible";
          break;
        case 2:
          this.slideC.nativeElement.style.visibility = hidden ? "hidden" : "visible";
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