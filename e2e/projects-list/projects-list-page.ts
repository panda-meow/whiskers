import {browser, by, element} from 'protractor';
import {AppConfig} from '../../src/app/config/app.config';

export class ProjectsListPage {
  static navigateTo(): any {
    return browser.get(AppConfig.routes.projects);
  }

  static getNumberProjects(): any {
    return element.all(by.css('#left mat-list-item')).count();
  }
}
