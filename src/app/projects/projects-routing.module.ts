import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ProjectListComponent} from './project-list/project-list.component';
import {ProjectDetailComponent} from './project-detail/project-detail.component';
import {ProjectsComponent} from './projects.component';

const projectsRoutes: Routes = [
  {
    path: '',
    component: ProjectsComponent,
    children: [
      {path: '', component: ProjectListComponent},
      {path: ':id', component: ProjectDetailComponent}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(projectsRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class ProjectRoutingModule {
}
