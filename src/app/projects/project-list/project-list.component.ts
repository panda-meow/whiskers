import {Component, ViewChild, Directive, AfterContentInit} from '@angular/core';
import {BreakpointObserver, BreakpointState, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs/Observable';
import { MediaChange, ObservableMedia} from '@angular/flex-layout';

import {Project} from '../shared/project.model';
import {ProjectService} from '../shared/project.service';
import {LoadingComponent} from '../../core/loading/loading.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {AppConfig} from '../../config/app.config';
import {Router} from '@angular/router';
import {LoggerService} from '../../core/logger.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})

export class ProjectListComponent {

  projects: Project[];
  newProjectForm: FormGroup;
  showFirst: boolean;
  showLast: boolean;
  columnNum = 2;
  canVote = false;
  error: string;
  @ViewChild('form') myNgForm; // just to call resetForm method

  constructor(private projectService: ProjectService,
              private dialog: MatDialog,
              private router: Router,
              private formBuilder: FormBuilder,
              private  mq: BreakpointObserver,
              private media: ObservableMedia
            ) {
    this.canVote = this.projectService.checkIfUserCanVote();

    this.newProjectForm = this.formBuilder.group({
      'name': ['', [Validators.required]],
      'alterEgo': ['', [Validators.required]]
    });

    this.projectService.getAllProjects().subscribe((projects: Array<Project>) => {
      this.projects = projects.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
    });



    media.asObservable()
    .subscribe((change: MediaChange) => {
      // alert(change.mqAlias);
      console.log(change.mqAlias);
      if (change.mqAlias == 'xs') {
        this.columnNum = 1;
        this.showFirst = false;
        this.showLast = false;
      } else if (change.mqAlias == 'sm'  ) {
        this.columnNum = 2;
        this.showFirst = false;
        this.showLast = true;
      } else {
        this.columnNum = 3;
        this.showFirst = true;
        this.showLast = true;
      }
    });

  }



  headerURL(project: Project): string {
    return Project.headerURL(project);
  }

  thumbnailURL(project: Project): string {
    return Project.thumbnailURL(project);
  }

  previewURL(project: Project): string {
    return Project.previewURL(project);
  }

  seeProjectDetails(project): void {
      this.router.navigate([AppConfig.routes.projects + '/' + project.id]);
  }

  // remove(projectToRemove: Project): void {
  //   let dialogRef = this.dialog.open(RemoveProjectDialogComponent);
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       this.projectService.deleteProjectById(projectToRemove.id).subscribe(() => {
  //         this.projectService.showSnackBar('projectRemoved');
  //         this.projects = this.projects.filter(project => project.id !== projectToRemove.id);
  //       }, (response: Response) => {
  //         if (response.status === 500) {
  //           this.error = 'projectDefault';
  //         }
  //       });
  //     }
  //   });
  // }
}

// @Component({
//   selector: 'app-remove-project-dialog',
//   templateUrl: './remove-project.dialog.html',
// })

// export class RemoveProjectDialogComponent {
//   constructor() {
//   }
// }
