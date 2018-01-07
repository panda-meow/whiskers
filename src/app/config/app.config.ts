import {InjectionToken} from '@angular/core';

import {IAppConfig} from './iapp.config';

export let APP_CONFIG = new InjectionToken('app.config');

export const AppConfig: IAppConfig = {
  routes: {
    projects: 'projects',
    error404: '404'
  },
  endpoints: {
    projects: 'http://' + window.location.hostname + ':8080/projects'
  },
  votesLimit: 3,
  topProjectsLimit: 4,
  snackBarDuration: 3000,
  repositoryURL: 'https://github.com/Ismaestro/angular5-example-app'
};
