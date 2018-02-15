import { Component, AfterViewInit } from "@angular/core";
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

import { ProjectService } from "../shared/project.service";
import { Router } from "@angular/router";

/*@Component({
  selector: 'home',
  templateUrl: './project-home.component.html',
  styleUrls: ['./project-home.component.scss'],
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

export class CarouselComponent {

}*/

@Component({
  selector: 'app-project-home',
  templateUrl: './project-home.component.html',
  styleUrls: ['./project-home.component.scss'],
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

export class ProjectHomeComponent implements AfterViewInit {


  ngAfterViewInit(): void {
  }

  public stateA: String = "current"
  public stateB: String = "next"

  private animationLevel: number = 0; 

  constructor(private projectService: ProjectService,
    private router: Router) {

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