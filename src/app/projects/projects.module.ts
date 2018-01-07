import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {ProjectRoutingModule} from './projects-routing.module';
import {SharedModule} from '../shared/modules/shared.module';

import {ProjectListComponent, RemoveProjectDialogComponent} from './project-list/project-list.component';
import {ProjectService} from './shared/project.service';
import {ProjectDetailComponent} from './project-detail/project-detail.component';
import {ProjectsComponent} from './projects.component';
import {ExperimentComponent} from './experiment/experiment.component'

import {ProjectSectionComponentA} from './experiment/components/project-section/project-section-a.component';
import {ProjectSectionComponentB} from './experiment/components/project-section/project-section-b.component';
import { ProjectSectionCenteredTextComponent } from './experiment/components/project-section/project-section-centered-text.component';
import { ProjectSectionCenteredQuoteComponent } from './experiment/components/project-section/project-section-centered-quote.component';
import { ProjectSectionCenteredImageComponent } from './experiment/components/project-section/project-section-centered-image.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ProjectRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ProjectsComponent,
    ProjectListComponent,
    ExperimentComponent,
    RemoveProjectDialogComponent,
    ProjectDetailComponent,
    ProjectSectionComponentA,
    ProjectSectionComponentB,
    ProjectSectionCenteredTextComponent,
    ProjectSectionCenteredQuoteComponent,
    ProjectSectionCenteredImageComponent
  ],
  exports: [
    ProjectSectionComponentA,
    ProjectSectionComponentB,
    ProjectSectionCenteredTextComponent,
    ProjectSectionCenteredQuoteComponent,
    ProjectSectionCenteredImageComponent
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
