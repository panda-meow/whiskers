import {async, TestBed} from '@angular/core/testing';
import {APP_BASE_HREF} from '@angular/common';
import {ProjectListComponent} from './project-list.component';
import {ProjectsModule} from '../projects.module';
import {TestsModule} from '../../shared/modules/tests.module';
import {TranslateModule} from '@ngx-translate/core';
import {APP_CONFIG, AppConfig} from '../../config/app.config';

describe('ProjectListComponent', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestsModule,
        TranslateModule.forRoot(),
        ProjectsModule
      ],
      providers: [
        {provide: APP_CONFIG, useValue: AppConfig},
        {provide: APP_BASE_HREF, useValue: '/'}
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectListComponent);
    fixture.detectChanges();
    component = fixture.debugElement.componentInstance;
  }));

  it('should create project list component', (() => {
    expect(component).toBeTruthy();
  }));
});
