import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ProjectTopComponent} from './projects/project-top/project-top.component';
import {AboutComponent} from './core/about/about.component';
import {ContactComponent} from './core/contact/contact.component';
import {AppConfig} from './config/app.config';
import {Error404Component} from './core/error404/error-404.component';
import { ProjectHomeComponent } from './projects/project-home/project-home.component';

const routes: Routes = [
  // {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: '', component: ProjectTopComponent, pathMatch: 'full'},
  {path: 'carousel-test', component: ProjectHomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'contact', component: ContactComponent},
  {path: AppConfig.routes.projects, loadChildren: 'app/projects/projects.module#ProjectsModule'},
  {path: AppConfig.routes.error404, component: Error404Component},

  // otherwise redirect to 404
  {path: '**', redirectTo: '/' + AppConfig.routes.error404}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {enableTracing: true})
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {
}
