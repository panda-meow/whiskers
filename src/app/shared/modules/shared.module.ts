import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from './material.module';
import {TranslateModule} from '@ngx-translate/core';
import {ProjectService} from '../../projects/shared/project.service';
import {FlexLayoutModule} from '@angular/flex-layout';
import { SHARED_COMPONENTS } from '../../projects/experiment/components/index';
import { MarkdownModule } from 'angular2-markdown';
import { MarkdownComponent } from 'angular2-markdown/markdown/markdown.component';

const SHARED_MODULES: any[] = [
  CommonModule,
];

@NgModule({
  imports: [
    MaterialModule,
    FlexLayoutModule,
    TranslateModule,
    MarkdownModule.forRoot(),
    SHARED_MODULES
  ],
  declarations: [
    SHARED_COMPONENTS
    ],
  exports: [
    MaterialModule,
    FlexLayoutModule,
    TranslateModule,
    MarkdownComponent,
    SHARED_COMPONENTS
  ]
})

export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        ProjectService
      ]
    };
  }
}
