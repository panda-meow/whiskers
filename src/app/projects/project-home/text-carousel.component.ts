import { Component, ViewChild, Input, AfterContentInit, ElementRef, ViewChildren, QueryList, AfterViewInit } from "@angular/core";
import { transition, state, animate, style, trigger } from "@angular/animations";
import { Project } from "../shared/project.model";

@Component({
  selector: 'text-carousel',
  template: `
    <h4 
      (@slideState.done)="done(0)" 
      [@slideState]="states[0]" #slidea>{{imageA}}</h4>
    <h4 
      (@slideState.done)="done(1)" 
      [@slideState]="states[1]" #slideb>{{imageB}}</h4>
    <h4 
      (@slideState.done)="done(2)" 
      [@slideState]="states[2]" #slidec>{{imageC}}</h4>
  `,
  styles: [`
    :host {
      position: relative;
      display: block;
      overflow: hidden;
    }
    h4 {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      line-height: 1.5;
      font-size: 18px;
      font-weight: normal;
      transition: all .4s ease-out;
      transition-delay: .2s;
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
      /*transition('previous => current', animate('400ms ease-in')),
      transition('current => next', animate('400ms ease-in')),
      transition('current => previous', animate('400ms ease-in')),
      transition('next => current', animate('400ms ease-in')),*/
    ])
  ]
})

export class TextCarouselComponent implements AfterContentInit {

  @ViewChild("slidea") slideA;
  @ViewChild("slideb") slideB;
  @ViewChild("slidec") slideC;

  public imageA: String
  public imageB: String
  public imageC: String

  @Input()
  projects: Project[]

  public states: String[] = ["current", "next", "previous"];

  private animationLevel: number = 0; 

  private index: number = 0 

  public get isReady(): boolean {
    return this.animationLevel == 0;
  }

  public get current(): Project {
    return this.projects[this.index];
  }

  ngAfterContentInit(): void {
    this.imageA = this.projects[0].title;
    this.imageB = this.projects[1].title;
    this.imageC = this.projects[2].title;
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
          this.imageA = hidden ? "" : this.imageA;
          break;
        case 1:
          this.imageB = hidden ? "" : this.imageB;
          break;
        case 2:
          this.imageC = hidden ? "" : this.imageC;
          break;
      }
  }

  private setup(forward: boolean) {

    if(forward) {

      this.index = (this.index + 1) % this.projects.length;

      this.hidden(this.nextIndex(), false);
      this.set(this.nextIndex(), this.projects[this.index].title);
      this.hidden(this.previousIndex(), true);

      let last = this.states[this.states.length - 1];
      for(let i = this.states.length - 1; i > 0; i-=1) {
        this.states[i] = this.states[i - 1];
      }
      this.states[0] = last;

    } else {
      this.index = (this.index - 1) < 0 ? (this.projects.length - 1) : (this.index - 1);

      this.hidden(this.previousIndex(), false);
      this.set(this.previousIndex(), this.projects[this.index].title);
      this.hidden(this.nextIndex(), true);

      let first = this.states[0];
      for(let i = 1; i < this.states.length; i++) {
        this.states[i - 1] = this.states[i];
      }
      this.states[this.states.length - 1] = first;
    }
  }
}

