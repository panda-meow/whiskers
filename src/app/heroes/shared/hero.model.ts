export class Hero {

  constructor(public id: number,
              public name: string,
              public categories: [string],
              public alterEgo: string,
              public title: string,
              public thumbnail: boolean,
              public header: boolean,
              public likes: number) {
  }

  public static thumbnailURL(hero: Hero): string {
    if(hero.thumbnail) {
      return "http://localhost:8080/heroes/" + hero.id + "/thumbnail";
    } else {
      return "assets/images/heroes/default.png";
    }
  }

  public static headerURL(hero: Hero): string {
    if(hero.header) {
      return "http://localhost:8080/heroes/" + hero.id + "/header";
    } else {
      return null;
    }
  }
}
