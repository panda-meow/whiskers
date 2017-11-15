import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {ProjectRoutingModule} from './projects-routing.module';
import {SharedModule} from '../shared/modules/shared.module';

import {ProjectListComponent, RemoveProjectDialogComponent} from './project-list/project-list.component';
import {ProjectService} from './shared/project.service';
import {ProjectDetailComponent} from './project-detail/project-detail.component';
import {ProjectsComponent} from './projects.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ProjectRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    ProjectsComponent,
    ProjectListComponent,
    RemoveProjectDialogComponent,
    ProjectDetailComponent
  ],
  entryComponents: [
    RemoveProjectDialogComponent
  ],
  providers: [
    ProjectService
  ]
})

export class ProjectsModule {
}
