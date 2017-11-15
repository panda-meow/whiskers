import {async, TestBed} from '@angular/core/testing';
import {ProjectService} from './project.service';
import {APP_BASE_HREF} from '@angular/common';
import {APP_CONFIG, AppConfig} from '../../config/app.config';
import {TestsModule} from '../../shared/modules/tests.module';
import {TranslateModule} from '@ngx-translate/core';
import {HttpErrorResponse} from '@angular/common/http';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';

describe('ProjectService', () => {
  let projectService;
  let newProjectCreated;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestsModule,
        TranslateModule.forRoot()
      ],
      providers: [
        {provide: APP_CONFIG, useValue: AppConfig},
        {provide: APP_BASE_HREF, useValue: '/'},
        ProjectService
      ]
    });

    projectService = TestBed.get(ProjectService);
  });

  it('should contains projects', async(() => {
    projectService.getAllProjects().subscribe((data: any) => {
      expect(data.length).toBeGreaterThan(AppConfig.topProjectsLimit);
    });
  }));

  it('should get project by id 1', async(() => {
    projectService.getProjectById('1').subscribe((project) => {
      expect(project.id).toEqual(1);
    });
  }));

  it('should fail getting project by no id', async(() => {
    projectService.getProjectById('noId').subscribe(() => {
    }, (error) => {
      expect(error).toEqual(jasmine.any(HttpErrorResponse));
    });
  }));

  it('should fail creating empty project', async(() => {
    projectService.createProject({}).subscribe(() => {
    }, (error) => {
      expect(error).toEqual(jasmine.any(HttpErrorResponse));
    });
  }));

  it('should fail deleting noId project', async(() => {
    projectService.deleteProjectById('noId').subscribe(() => {
    }, (error) => {
      expect(error).toEqual(jasmine.any(HttpErrorResponse));
    });
  }));

  it('should fail like empty project', async(() => {
    localStorage.setItem('votes', String(0));
    projectService.like('noId').subscribe(() => {
    }, (error) => {
      expect(error).toEqual(jasmine.any(HttpErrorResponse));
    });
  }));

  it('should return json response error', async(() => {
    expect(projectService.handleError(new Response('noId'))).toEqual(jasmine.any(ErrorObservable));
  }));

  it('should create project', async(() => {
    projectService.createProject({
      'name': 'test',
      'alterEgo': 'test'
    }).subscribe((project) => {
      newProjectCreated = project;
      expect(project.id).not.toBeNull();
    });
  }));

  it('should not like a project because no votes', async(() => {
    localStorage.setItem('votes', String(AppConfig.votesLimit));
    expect(projectService.checkIfUserCanVote()).toBe(false);
    projectService.like(newProjectCreated).subscribe(() => {
    }, (error) => {
      expect(error).toBe('maximum votes');
    });
  }));

  it('should like a project', async(() => {
    localStorage.setItem('votes', String(0));
    expect(projectService.checkIfUserCanVote()).toBe(true);
    projectService.like(newProjectCreated).subscribe((response) => {
      expect(response).toEqual({});
    });
  }));

  it('should delete a project', async(() => {
    projectService.deleteProjectById(newProjectCreated.id).subscribe((response) => {
      expect(response).toEqual({});
    });
  }));
});
