export class Project {

  constructor(public id: number,
              public name: string,
              public categories: string[],
              public alterEgo: string,
              public title: string,
              public thumbnail: boolean,
              public header: boolean,
              public sections: any[],
              public body: string,
              public likes: number) {
  }

  public static thumbnailURL(project: Project): string {
    if(project.thumbnail) {
      return "http://" + window.location.hostname + ":8080/projects/" + project.id + "/thumbnail";
    } else {
      return "assets/images/projects/default.png";
    }
  }

  public static headerURL(project: Project): string {
    if(project.header) {
      return "http://" + window.location.hostname + ":8080/projects/" + project.id + "/header";
    } else {
      return null;
    }
  }
}
