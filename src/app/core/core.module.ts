import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {throwIfAlreadyLoaded} from './module-import-guard';
import {LoggerService} from './logger.service';

import {NavComponent} from './nav/nav.component';
import {FooterComponent} from './footer/footer.component';
// import {LoadingComponent} from './loading/loading.component';
import {SharedModule} from '../shared/modules/shared.module';
import {RouterModule} from '@angular/router';
import {SearchBarComponent} from './search-bar/search-bar.component';
import {Error404Component} from './error404/error-404.component';
import {AboutComponent} from './about/about.component';
import {ContactComponent} from './contact/contact.component';
import {ProgressBarService} from './progress-bar.service';
import {ScrollTopService} from './scroll-top.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [
    NavComponent,
    FooterComponent,
    // LoadingComponent
  ],
  declarations: [
    NavComponent,
    FooterComponent,
    SearchBarComponent,
    // LoadingComponent,
    AboutComponent,
    ContactComponent,
    Error404Component
  ],
  providers: [
    LoggerService,
    ProgressBarService,
    ScrollTopService
  ]
})

export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
