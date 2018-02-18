import {Component, Inject} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import {APP_CONFIG, AppConfig} from '../../config/app.config';
import {IAppConfig} from '../../config/iapp.config';
import {ProgressBarService} from '../progress-bar.service';
import {Project} from '../../projects/shared/project';
import {ProjectService} from '../../projects/shared/project.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class NavComponent {
  appConfig: any;
  menuItems: any[];
  progressBarMode: string;
  projects: Project[];
  Project: Project = <Project>{};

  private translateService: TranslateService;

  constructor(
    private _router: Router,
    private projectService: ProjectService,
    @Inject(APP_CONFIG) appConfig: IAppConfig,
      private progressBarService: ProgressBarService,
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

  changeLanguage(language: string): void {
    this.translateService.use(language).subscribe(() => {
      this.loadMenus();
    });
  }

  get hide(): Boolean {
    return window.location.pathname == '/' || window.location.pathname == '/carousel-test'; // A little hacky :(
  }

  routeHome(): void {
      this._router.navigate(['']);
  }

  private loadMenus(): void {
    this.translateService.get(['about', 'contact'], {}).subscribe((texts: any) => {
      this.menuItems = [
    // this.translateService.get(['home', 'projectsList', 'about', 'contact'], {}).subscribe((texts: any) => {
    //   this.menuItems = [
        // {link: '/', name: texts['home']},
        // {link: '/' + AppConfig.routes.projects, name: texts['projectsList']},
        {link: 'about', name: texts['about']},
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
