import { Component, AfterViewInit, ViewChild, OnChanges, SimpleChanges, Input } from "@angular/core";
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

import { ProjectService } from "../shared/project.service";
import { Router } from "@angular/router";

@Component({
  selector: 'carousel',
  template: `
    <div class="slide"
      style="background-color: red"
      (@slideState.done)="done(0)" 
      [@slideState]="stateA">
      <ng-content></ng-content>
      </div>
    <div class="slide"
      style="background-color: blue"
      (@slideState.done)="done(1)" 
      [@slideState]="stateB"></div>
  `,
  styles: [`
    :host {
      display: block;
      overflow: hidden;
    }
    .slide {
      background-color: lightblue;
      position: absolute;
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

export class CarouselComponent implements OnChanges {

  public stateA: String = "current"
  public stateB: String = "next"

  public states: String[] = ["current", "next"];

  private animationLevel: number = 0; 

  @Input()
  current: any

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Changes: ' + this.current);
  }

  constructor() {}

  public done(index: number) {
    console.log('test: ' + index);
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
      this.animationLevel = 2;
      this.setup(false);
    } 
  }

  public next() {
    if(this.animationLevel == 0) {
      this.animationLevel = 2;
      this.setup(true);
    } 
  }

  private run() {
    if(this.stateA == 'current') {
      this.stateA = this.stateB == 'previous' ? 'next' : 'previous';
      this.stateB = 'current';
    } else {
      this.stateB = this.stateA == 'previous' ? 'next' : 'previous';
      this.stateA = 'current';
    }
  }

  private setup(forward: boolean) {
    if(this.stateA == 'current') {
      let last = this.stateB
      this.stateB = forward ? 'previous' : 'next';
      if(last == this.stateB) {
        this.doneB();
      }
    } else {
      let last = this.stateA
      this.stateA = forward ? 'previous' : 'next';
      if(last == this.stateA) {
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

  @ViewChild(CarouselComponent) carousel;

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