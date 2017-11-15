import {async, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {ProjectService} from '../../projects/shared/project.service';
import {SearchBarComponent} from './search-bar.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import {APP_CONFIG, AppConfig} from '../../config/app.config';
import {AppRoutingModule} from '../../app-routing.module';
import {ProjectTopComponent} from '../../projects/project-top/project-top.component';
import {APP_BASE_HREF} from '@angular/common';
import {TestsModule} from '../../shared/modules/tests.module';
import {Error404Component} from '../error404/error-404.component';

describe('SearchBarComponent', () => {
  let fixture;
  let component;
  let projectService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestsModule,
        TranslateModule.forRoot(),
        AppRoutingModule
      ],
      declarations: [
        SearchBarComponent,
        ProjectTopComponent,
        Error404Component
      ],
      providers: [
        {provide: APP_CONFIG, useValue: AppConfig},
        {provide: APP_BASE_HREF, useValue: '/'},
        ProjectService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBarComponent);
    fixture.detectChanges();
    component = fixture.debugElement.componentInstance;
    projectService = TestBed.get(ProjectService);
  }));

  it('should create project search component', (() => {
    expect(component).toBeTruthy();
  }));

  it('should get all projects', fakeAsync(() => {
    spyOn(projectService, 'getAllProjects').and.returnValue(Promise.resolve(true));
    tick();
    fixture.detectChanges();
    expect(component.defaultProjects.length).toBeGreaterThan(0);
    for (let project of component.defaultProjects) {
      expect(project.default).toBe(true);
    }
  }));

  it('should filter projects array', (() => {
    component.defaultProjects = [
      {
        'id': 1,
        'name': 'batman',
        'default': true
      },
      {
        'id': 2,
        'name': 'spiderman',
        'default': false
      }
    ];
    expect(component.filterProjects('batman').length).toBe(1);
    expect(component.filterProjects('spiderman').length).toBe(0);
    expect(component.filterProjects().length).toBe(2);
  }));
});
