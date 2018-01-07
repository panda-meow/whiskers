
export class ProjectSectionA {
    constructor(public name: string, public foo: string) {}
}

export class ProjectSection {
  constructor(public type: string,
              public attributes: Map<string, any>) {
  }
}
