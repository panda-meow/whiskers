import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ProjectListComponent} from './project-list/project-list.component';
import {ProjectDetailComponent} from './project-detail/project-detail.component';
import {ProjectsComponent} from './projects.component';
import {ExperimentComponent} from './experiment/experiment.component';

const projectsRoutes: Routes = [
  {
    path: '',
    component: ProjectsComponent,
    children: [
      {path: '', component: ProjectListComponent},
      {path: 'foo/:id', component: ExperimentComponent},
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
