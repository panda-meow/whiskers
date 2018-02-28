import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import {Project} from '../shared/project.model';
import {ProjectSection} from '../shared/project-section.model';
import {ProjectService} from '../shared/project.service';
import {ScrollTopService} from '../../core/scroll-top.service';
import {ActivatedRoute} from '@angular/router';
import {NgsRevealConfig} from 'ng-scrollreveal';

@Component({
    selector: 'experiment',
    styleUrls: ['../project-detail/project-detail.component.scss', './experiment.component.scss'],
    templateUrl: './experiment.component.html',
})

export class ExperimentComponent implements OnInit {
    project: Project;
    related: Project[];
    sections: any[] = [
    ];
    type: any;

  constructor(private projectService: ProjectService,
              private activatedRoute: ActivatedRoute,
              private ScrollTopService: ScrollTopService,
              config: NgsRevealConfig) {
    this.activatedRoute.params.subscribe((params: any) => {
      if (params['id']) {
        this.projectService.getProjectById(params['id']).subscribe((project: Project) => {
          this.project = project;
          console.log('this is the project:' + project);
        });

        this.projectService.getAllProjects().subscribe((projects: Project[]) => {
          this.related = projects.filter(function(project) { return project.id != params['id']; }).slice(0, 3);
        });
      }
    });
     // customize default values of ng-scrollreveal directives used by this component tree
    //  config.duration = 500;
    //  config.easing = 'cubic-bezier(0.645, 0.045, 0.355, 1)';
    //  config.reset = true;
    //  config.viewFactor = 0.2;

     // test defaults
     config.origin = 'bottom';

     // Can be any valid CSS distance, e.g. '5rem', '10%', '20vw', etc.
     config.distance = '10px';

     // Time in milliseconds.
     config.duration = 1e3;
     config.delay =  100;

     // Starting angles in degrees, will transition from these values to 0 in all axes.
     config.rotate = { x: 0, y: 0, z: 0 };

     // Starting opacity value, before transitioning to the computed opacity.
     config.opacity = 0;

     // Starting scale value, will transition from this value to 1
     config.scale = 1;

     // Accepts any valid CSS easing, e.g. 'ease', 'ease-in-out', 'linear', etc.
    //  config.easing = 'cubic-bezier(0.6, 0.2, 0.1, 1)';
          // config.easing = 'cubic-bezier(0.645, 0.045, 0.355, 1)';
          config.easing = 'ease-in-out';



    // `<html>` is the default reveal container. You can pass either:
// DOM Node, e.g. document.querySelector('.fooContainer')
// Selector, e.g. '.fooContainer'
// config.container = window.document.querySelector('experiment');

     // true/false to control reveal animations on mobile.
     config.mobile = true;

     // true:  reveals occur every time elements become visible
     // false: reveals occur once as elements become visible
     config.reset = true;

     // 'always' — delay for all reveal animations
     // 'once'   — delay only the first time reveals occur
     // 'onload' - delay only for animations triggered by first load
     config.useDelay = 'always';

     // Change when an element is considered in the viewport. The default value
     // of 0.20 means 20% of an element must be visible for its reveal to occur.
    //  config.viewFactor = 0.99;
     config.viewFactor = 0.20;

     // Pixel values that alter the container boundaries.
     // e.g. Set `{ top: 48 }`, if you have a 48px tall fixed toolbar.
     // --
     // Visual Aid: https://scrollrevealjs.org/assets/viewoffset.png
    //  config.viewOffset = { top: -200, right: 0, bottom: 200, left: 0 };
    //  config.viewOffset = { top: -200, right: 0, bottom: 200, left: 0 };
     config.viewOffset = { top: -58, right: 0, bottom: 58, left: 0 };
    //  config.viewOffset = { top: 65, right: 0, bottom: 200, left: 0 };

     // other options here
  }

  asset(name: string): string {
    return name == null ? null : 'http://' + window.location.hostname + ':8080/projects/' + this.project.id + '/assets/' + name;
  }

  headerURL(project: Project): string {
    return Project.headerURL(project);
  }

  thumbnailURL(project: Project): string {
    return Project.thumbnailURL(project);
  }

  ngOnInit() {
    // console.log('ngOnInit called.');
    // setTimeout(function() {
      // console.log('In ngAfterViewInit before setinterval called.');
      // call service
      this.ScrollTopService.setScrollTop();
    //  }, 1000);
    // this.ScrollTopService.setScrollTop();
  }


}
