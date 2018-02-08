// NgModules
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

// Modules
import {ProjectRoutingModule} from './projects-routing.module';
import {SharedModule} from '../shared/modules/shared.module';

// Components
// import {ProjectListComponent, RemoveProjectDialogComponent} from './project-list/project-list.component';
import {ProjectListComponent } from './project-list/project-list.component';
import {ProjectDetailComponent} from './project-detail/project-detail.component';
import {ProjectsComponent} from './projects.component';
import {ExperimentComponent} from './experiment/experiment.component';
// import {CarouselComponent} from './carousel/carousel.component';
// import { BannerCtrlDirective } from './carousel/carousel.directive';
// import {ProjectHeaderComponent} from './experiment/components/main/project-header/project-header.component';
// import {ProjectCalloutComponent} from './experiment/components/main/project-callout/project-callout.component';
// import {ProjectSectionImageTextComponent} from './experiment/components/project-section/project-section-image-text.component';
// import {ProjectSectionNotesComponent} from './experiment/components/project-section/project-section-notes.component';
// import { ProjectSectionCenteredTextComponent } from './experiment/components/project-section/project-section-centered-text.component';
// import { ProjectSectionCenteredQuoteComponent } from './experiment/components/project-section/project-section-centered-quote.component';
// import { ProjectSectionCenteredImageComponent } from './experiment/components/project-section/project-section-centered-image.component';
// import { ProjectSectionTwoImagesComponent } from './experiment/components/project-section/project-section-two-images.component';

// Services
import {ProjectService} from './shared/project.service';

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
    ExperimentComponent,
    // RemoveProjectDialogComponent,
    ProjectDetailComponent,
    // CarouselComponent,
    // BannerCtrlDirective
    // ProjectHeaderComponent,
    // ProjectCalloutComponent
    // ProjectSectionNotesComponent,
    // ProjectSectionCenteredTextComponent,
    // ProjectSectionCenteredQuoteComponent,
    // ProjectSectionCenteredImageComponent,
    // ProjectSectionTwoImagesComponent
  ],
  exports: [

  ],
  entryComponents: [
    // RemoveProjectDialogComponent
  ],
  providers: [
    ProjectService
  ]
})

export class ProjectsModule {
}
