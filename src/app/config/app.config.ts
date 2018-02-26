import {InjectionToken} from '@angular/core';

import {IAppConfig} from './iapp.config';

export let APP_CONFIG = new InjectionToken('app.config');

export const AppConfig: IAppConfig = {
  routes: {
    home: ' ',
    projects: 'projects',
    about: 'about',
    contact: 'contact',
    error404: '404'
  },
  endpoints: {
    home: 'http://' + window.location.hostname + ':8080',
    projects: 'http://' + window.location.hostname + ':8080/projects',
    about: 'http://' + window.location.hostname + ':8080/about',
    contact: 'http://' + window.location.hostname + ':8080/contact'
  },
  votesLimit: 3,
  topProjectsLimit: 4,
  snackBarDuration: 3000,
  repositoryURL: 'https://github.com/panda-meow/whiskers'
};
