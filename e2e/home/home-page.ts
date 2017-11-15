import {browser, by, element} from 'protractor';

export class HomePage {
  static navigateTo(): any {
    return browser.get('/');
  }

  static getNumberProjects(): any {
    return element.all(by.css('#projects-list mat-card')).count();
  }
}
