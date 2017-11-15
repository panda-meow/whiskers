import {ProjectsListPage} from './projects-list-page';

describe('Home page', function () {
  let page;

  beforeEach(() => {
    page = new ProjectsListPage();
  });

  it('should contains equal or more projects than default ones', () => {
    ProjectsListPage.navigateTo();
    expect<any>(ProjectsListPage.getNumberProjects()).toBeGreaterThanOrEqual(8);
  });
});
