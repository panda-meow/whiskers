import {Component} from '@angular/core';
import {LoggerService} from '../logger.service';
import {Project} from '../../projects/shared/project.model';
import {FormControl} from '@angular/forms';
import {ProjectService} from '../../projects/shared/project.service';
import {Router} from '@angular/router';
import {AppConfig} from '../../config/app.config';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  providers: [
    LoggerService
  ]
})

export class SearchBarComponent {
  defaultProjects: Array<Project> = [];
  projectFormControl: FormControl;
  filteredProjects: any;
  projectsAutocomplete: any;

  constructor(private projectService: ProjectService,
              private router: Router) {
    this.projectFormControl = new FormControl();

    this.projectService.getAllProjects().subscribe((projects: Array<Project>) => {
      this.defaultProjects = projects.filter(project => project['default']);

      this.projectFormControl.valueChanges
        .startWith(null)
        .map(value => this.filterProjects(value))
        .subscribe(projectsFiltered => {
          this.filteredProjects = projectsFiltered;
        });
    });
  }

  filterProjects(val: string): Project[] {
    return val ? this.defaultProjects.filter(project => project.name.toLowerCase().indexOf(val.toLowerCase()) === 0 && project['default'])
      : this.defaultProjects;
  }

  searchProject(project: Project): Promise<boolean> {
    LoggerService.log('Moved to project with id: ' + project.id);
    return this.router.navigate([AppConfig.routes.projects + '/' + project.id]);
  }
}
