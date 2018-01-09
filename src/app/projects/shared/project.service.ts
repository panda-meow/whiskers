import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {AppConfig} from '../../config/app.config';

import {Project} from './project.model';
import {Observable} from 'rxjs/Observable';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class ProjectService {
  private headers: HttpHeaders;
  private projectsUrl: string;
  private translations: any;

  private handleError(error: any) {
    if (error instanceof Response) {
      return Observable.throw(error.json()['error'] || 'backend server error');
    }
    return Observable.throw(error || 'backend server error');
  }

  constructor(private http: HttpClient,
              private translateService: TranslateService,
              private snackBar: MatSnackBar) {
    this.projectsUrl = AppConfig.endpoints.projects;
    this.headers = new HttpHeaders({'Content-Type': 'application/json'});

    this.translateService.get(['projectCreated', 'saved', 'projectLikeMaximum', 'projectRemoved'], {
      'value': AppConfig.votesLimit
    }).subscribe((texts) => {
      this.translations = texts;
    });
  }

  getAllProjects(): Observable<Project[]> {
    return this.http.get(this.projectsUrl)
      .map(response => {
        return response;
      })
      .catch(error => this.handleError(error));
  }

  getProjectById(projectId: string): Observable<Project> {
    return this.http.get(this.projectsUrl + '/' + projectId)
      .map(response => {
        return response;
      })
      .catch(error => this.handleError(error));
  }

  createProject(project: any): Observable<Project> {
    return this.http
      .post(this.projectsUrl, JSON.stringify({
        name: project.name,
        alterEgo: project.alterEgo
      }), {headers: this.headers})
      .map(response => {
        this.showSnackBar('projectCreated');
        return response;
      })
      .catch(error => this.handleError(error));
  }

  /*like(project: Project) {
    if (this.checkIfUserCanVote()) {
      const url = `${this.projectsUrl}/${project.id}/like`;
      return this.http
        .post(url, {}, {headers: this.headers})
        .map((response) => {
          localStorage.setItem('votes', '' + (Number(localStorage.getItem('votes')) + 1));
          project.likes += 1;
          this.showSnackBar('saved');
          return response;
        })
        .catch(error => this.handleError(error));
    } else {
      this.showSnackBar('projectLikeMaximum');
      return Observable.throw('maximum votes');
    }
  }*/

  checkIfUserCanVote(): boolean {
    return Number(localStorage.getItem('votes')) < AppConfig.votesLimit;
  }

  deleteProjectById(id: any): Observable<Array<Project>> {
    const url = `${this.projectsUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .map((response) => {
        this.showSnackBar('projectRemoved');
        return response;
      })
      .catch(error => this.handleError(error));
  }

  showSnackBar(name): void {
    const config: any = new MatSnackBarConfig();
    config.duration = AppConfig.snackBarDuration;
    this.snackBar.open(this.translations[name], 'OK', config);
  }
}
