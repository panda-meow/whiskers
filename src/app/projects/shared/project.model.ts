export class Project {

  constructor(public id: number,
              public name: string,
              public categories: string[],
              public title: string,
              public sections: any[],
              public attributes: any,
            ) {
  }

  public static thumbnailURL(project: Project): string {
      return 'http://' + window.location.hostname + ':8080/projects/' + project.id + '/thumbnail';
  }

  public static previewURL(project: Project): string {
      return 'http://' + window.location.hostname + ':8080/projects/' + project.id + '/preview';
  }

  public static headerURL(project: Project): string {
      return 'http://' + window.location.hostname + ':8080/projects/' + project.id + '/header';
  }
}
