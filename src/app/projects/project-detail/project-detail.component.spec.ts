import {async, TestBed} from '@angular/core/testing';
import {APP_BASE_HREF} from '@angular/common';
import {ProjectDetailComponent} from './project-detail.component';
import {ProjectsModule} from '../projects.module';
import {TestsModule} from '../../shared/modules/tests.module';
import {APP_CONFIG, AppConfig} from '../../config/app.config';
import {TranslateModule} from '@ngx-translate/core';
import {ProjectService} from '../shared/project.service';

describe('ProjectDetailComponent', () => {
  let fixture;
  let component;
  let projectService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestsModule,
        TranslateModule.forRoot(),
        ProjectsModule
      ],
      providers: [
        {provide: APP_CONFIG, useValue: AppConfig},
        {provide: APP_BASE_HREF, useValue: '/'},
        ProjectService
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectDetailComponent);
    fixture.detectChanges();
    component = fixture.debugElement.componentInstance;
    projectService = TestBed.get(ProjectService);
  }));

  it('should create project detail component', (() => {
    expect(component).toBeTruthy();
  }));

  it('should like a project', async(() => {
    localStorage.setItem('votes', String(AppConfig.votesLimit - 1));
    component.like({id: 1}).then((result) => {
      expect(result).toBe(true);
    });
  }));
});
