import {Component, HostListener, ElementRef, Inject} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import {APP_CONFIG, AppConfig} from '../../config/app.config';
import {IAppConfig} from '../../config/iapp.config';
import {ProgressBarService} from '../progress-bar.service';
import {Project} from '../../projects/shared/project';
import {ProjectService} from '../../projects/shared/project.service';

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  animations: [
    trigger('scrollAnimation', [
      state('show', style({
        opacity: 1,
        // transform: 'translateX(0)',
      })),
      state('hide',   style({
        opacity: 0.65,
        // transform: 'translateY(-150%)'
      })),
      transition('show => hide', animate('700ms ease-out')),
      transition('hide => show', animate('800ms ease-out'))
      // transition('hide => show', animate('2000ms linear 1000ms'))
    ])
  ]
})

export class NavComponent {
  appConfig: any;
  menuItems: any[];
  progressBarMode: string;
  projects: Project[];
  Project: Project = <Project>{};
  state = 'show';
  lastScrollTop = 0;
  dir = '';
  showNav = true;
  private translateService: TranslateService;

  constructor(
    private _router: Router,
    private projectService: ProjectService,
    @Inject(APP_CONFIG) appConfig: IAppConfig,
      private progressBarService: ProgressBarService,
      public el: ElementRef,
      translateService: TranslateService) {
    this.appConfig = appConfig;
    this.translateService = translateService;
    this.loadMenus();
    this.progressBarService.updateProgressBar$.subscribe((mode: string) => {
      this.progressBarMode = mode;
    });

    this.projectService.getAllProjects().subscribe((projects: Array<Project>) => {
      // this.projects = projects.sort((a, b) => {
      //   return a.name.localeCompare(b.name);
      // });
      this.projects = projects;
    });


  }
  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const componentPosition = this.el.nativeElement.offsetTop;
    const scrollPosition = window.pageYOffset;
    // const blah = window.

    // scrollDirection = number;
  // console.log('component position ' + componentPosition);
  // console.log('scroll position' + scrollPosition);
  // console.log('scrollY ' + window.scrollY);
    // if (scrollPosition >= componentPosition) {
    //   this.state = 'hide';
    // } else {
    //   this.state = 'show';
    // }

    if (pageYOffset  > this.lastScrollTop) {

        this.dir = 'down';
        this.state = 'hide';
        // this.showNav = false;
    } else {
             this.dir = 'up';
          this.state = 'show';
          // this.showNav = true;


    }
    this.lastScrollTop = scrollPosition;
    // console.log('direction' + this.dir);
  }

  changeLanguage(language: string): void {
    this.translateService.use(language).subscribe(() => {
      this.loadMenus();
    });
  }

  get hide(): Boolean {
    return window.location.pathname == '/carousel-test'; // A little hacky :(
  }

  get isProjectDetail(): Boolean {
    return window.location.pathname.startsWith('/projects/'); // A little hacky :(
  }

  get isHome(): Boolean {
//  console.log('isHome; ' + window.location.pathname == ('/') );

    return window.location.pathname == ('/'); // A little hacky :(
  }

  routeHome(): void {
      this._router.navigate(['']);
  }

  private loadMenus(): void {
    this.translateService.get(['contact'], {}).subscribe((texts: any) => {
      this.menuItems = [
    // this.translateService.get(['home', 'projectsList', 'about', 'contact'], {}).subscribe((texts: any) => {
    //   this.menuItems = [
        // {link: '/', name: texts['home']},
        // {link: '/' + AppConfig.routes.projects, name: texts['projectsList']},
        // {link: 'about', name: texts['about']},
        {link: 'contact', name: texts['contact']}
      ];
    });
  }

  seeProjects(): void {
    this._router.navigate([AppConfig.routes.projects]);
}

  seeProjectDetails(project): void {
    this._router.navigate([AppConfig.routes.projects + '/' + project.id]);
}

}
