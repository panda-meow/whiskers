import {async, TestBed} from '@angular/core/testing';
import {APP_BASE_HREF} from '@angular/common';
import {ProjectsComponent} from './projects.component';
import {ProjectsModule} from './projects.module';
import {TestsModule} from '../shared/modules/tests.module';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('ProjectsComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestsModule,
        ProjectsModule
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  it('should create projects component', (() => {
    const fixture = TestBed.createComponent(ProjectsComponent);
    fixture.detectChanges();
    const component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  }));
});
