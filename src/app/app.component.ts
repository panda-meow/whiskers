import {Component, ElementRef, AfterContentInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Meta, Title} from '@angular/platform-browser';

import {NavigationEnd, Router} from '@angular/router';
import {AppConfig} from './config/app.config';
import {MatSnackBar} from '@angular/material';

declare const Modernizr;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent {

  constructor(private translateService: TranslateService,
              private title: Title,
              private meta: Meta,
              private elementRef: ElementRef,
              private snackBar: MatSnackBar,
              private router: Router) {

    this.translateService = translateService;
    this.translateService.setDefaultLang('en');
    this.translateService.use('en');

    this.title.setTitle('Chelsea Pattee | Professional Portfolio');
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {

        switch (event.urlAfterRedirects) {
          case '/':
          // document.body.style.backgroundColor = '#F89A21';
          document.body.style.backgroundImage = 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)';

          break;
          case '/projects':
            document.body.style.backgroundColor = '#5f5f5f';
            document.body.style.backgroundImage = 'none';
            break;

          default:
            // document.body.style.backgroundColor = '#ffffff';
            document.body.style.backgroundImage = 'none';
            document.body.style.backgroundColor = '#ffffff';
            break;
        }

        switch (event.urlAfterRedirects) {
          case '/':
            this.meta.updateTag({
              name: 'description',
              content: 'Chelsea Pattee | Professional Portfolio. Built with Angular CLI, Angular Material and more'
            });
            break;
          case '/' + AppConfig.routes.projects:
            this.title.setTitle('Projects list');
            this.meta.updateTag({
              name: 'description',
              content: 'List  of super-projects'
            });
            break;
        }
      }
    });

    this.checkBrowserFeatures();
  }

  checkBrowserFeatures() {
    let supported = true;
    for (let feature in Modernizr) {
      if (Modernizr.hasOwnProperty(feature) &&
        typeof Modernizr[feature] === 'boolean' && Modernizr[feature] === false) {
        supported = false;
        break;
      }
    }

    if (!supported) {
      this.translateService.get(['updateBrowser']).subscribe((texts) => {
        this.snackBar.open(texts['updateBrowser'], 'OK');
      });
    }

    return supported;
  }
}
