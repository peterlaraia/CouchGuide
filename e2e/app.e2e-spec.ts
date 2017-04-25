import { CouchGuidePage } from './app.po';

describe('couch-guide App', () => {
  let page: CouchGuidePage;

  beforeEach(() => {
    page = new CouchGuidePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
