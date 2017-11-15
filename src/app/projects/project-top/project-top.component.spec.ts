import {async, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {APP_BASE_HREF} from '@angular/common';
import {ProjectTopComponent} from './project-top.component';
import {ProjectService} from '../shared/project.service';
import {TestsModule} from '../../shared/modules/tests.module';
import {TranslateModule} from '@ngx-translate/core';
import {APP_CONFIG, AppConfig} from '../../config/app.config';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('ProjectTopComponent', () => {
  let fixture;
  let component;
  let projectService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestsModule,
        TranslateModule.forRoot(),
      ],
      declarations: [
        ProjectTopComponent
      ],
      providers: [
        {provide: APP_CONFIG, useValue: AppConfig},
        {provide: APP_BASE_HREF, useValue: '/'},
        ProjectService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectTopComponent);
    fixture.detectChanges();
    component = fixture.debugElement.componentInstance;
    projectService = TestBed.get(ProjectService);
  }));

  it('should create project top component', (() => {
    expect(component).toBeTruthy();
  }));

  it('should initialice component', fakeAsync(() => {
    fixture.detectChanges();
    spyOn(projectService, 'getAllProjects').and.returnValue(Promise.resolve(true));
    tick();
    fixture.detectChanges();
    expect(component.projects.length).toBe(AppConfig.topProjectsLimit);
  }));

  it('should like a project', async(() => {
    localStorage.setItem('votes', String(AppConfig.votesLimit - 1));
    component.like({id: 1}).then((result) => {
      expect(result).toBe(true);
    });
  }));

  it('should not like a project', async(() => {
    localStorage.setItem('votes', String(AppConfig.votesLimit));
    component.like({id: 1}).then(() => {
    }, (error) => {
      expect(error).toBe('maximum votes');
    });
    expect(projectService.checkIfUserCanVote()).toBe(false);
  }));
});
